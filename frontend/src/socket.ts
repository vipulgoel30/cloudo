// Third party imports
import io, { Socket } from "socket.io-client";

const globalObj = global as unknown as { client: Socket };

const socket: Socket = globalObj.client ?? io(process.env.NEXT_PUBLIC_SOCKET_SERVER);

if (process.env.NODE_ENV !== "production" && !globalObj.client) globalObj.client = socket;

export default socket;
