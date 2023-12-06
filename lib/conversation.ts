import { db } from "./db";

const findConversation = async (member1Id: string, member2Id: string) => {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [{ memberOneId: member1Id }, { memberTwoId: member2Id }],
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

const createNewConversation = async (member1Id: string, member2Id: string) => {
  try {
    return await db.conversation.create({
      data: {
        memberOneId: member1Id,
        memberTwoId: member2Id,
      },
      include: {
        memberOne: {
          include: { profile: true },
        },
        memberTwo: {
          include: { profile: true },
        },
      },
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getOrCreateConversation = async (
  member1Id: string,
  member2Id: string
) => {
  let conversation =
    (await findConversation(member1Id, member2Id)) ||
    (await findConversation(member2Id, member1Id));
  if (!conversation)
    conversation = await createNewConversation(member1Id, member2Id);

  return conversation;
};
