import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIO } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method !== "DELETE" && req.method !== "PATCH")
    return res.status(405).json({ error: "Method not supported" });

  try {
    const profile = await currentProfilePages(req);
    if (!profile) return res.status(401).json({ error: "Unauthorized" });
    const { directMessageId, conversationId } = req.query;
    const { content } = req.body;

    if (!conversationId)
      return res.status(400).json({ error: "Conversation ID missing" });

    const conversation = await db.conversation.findFirst({
      where: {
        id: conversationId as string,
        OR: [
          { memberOne: { profileId: profile.id } },
          { memberTwo: { profileId: profile.id } },
        ],
      },
      include: {
        memberOne: { include: { profile: true } },
        memberTwo: { include: { profile: true } },
      },
    });

    if (!conversation)
      return res.status(404).json({ message: "Conversation not found" });

    const member =
      conversation.memberOne.profileId === profile.id
        ? conversation.memberOne
        : conversation.memberTwo;

    if (!member) return res.status(404).json({ error: "Member not found" });

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        conversationId: conversationId as string,
      },
      include: { member: { include: { profile: true } } },
    });

    if (!directMessage || directMessage.deleted)
      return res.status(404).json({ error: "Message not found" });

    const isMessageOwner = directMessage.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify)
      return res
        .status(403)
        .json({ error: "You have no permissions to modify this message" });

    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: { id: directMessageId as string },
        data: {
          fileUrl: null,
          deleted: true,
          content: "This message has been deleted",
        },
        include: { member: { include: { profile: true } } },
      });
    }
    if (req.method === "PATCH") {
      if (!isMessageOwner)
        return res
          .status(403)
          .json({ error: "You have no permissions to update this message" });
      directMessage = await db.directMessage.update({
        where: { id: directMessageId as string },
        data: { content },
        include: { member: { include: { profile: true } } },
      });
    }

    const updateKey = `chat:${conversation.id}:messages:update`;

    res.socket?.server?.io?.emit(updateKey, directMessage);

    return res.status(200).json(directMessage);
  } catch (e) {
    console.log("DIRECT_MESSAGE_ID", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
