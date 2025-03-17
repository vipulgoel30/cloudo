// Third party imports
import { Server, type Socket } from "socket.io";

// User imports
import httpServer from "./app.js";

const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket: Socket) => {
  console.log(socket.id);

  socket.on("join-room", (username: string) => {
    socket.join(username);
  });
});
