import { Server as NetServer } from "http";
import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponseServerIO } from "@/types";

export const config = {
  api: {
    bodyParser: true,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any;
    res.socket.server.io = new SocketIOServer(httpServer, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
  }
  res.end();
};

export default ioHandler;
