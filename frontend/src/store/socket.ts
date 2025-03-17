// Third party imports
import { createSlice } from "@reduxjs/toolkit";

enum ConnectionStatus {
  INIT,
  ACCEPT,
  COMPLETED,
}

export interface Message {
  id: string;
  text: string;
  isEncrypted: boolean;
  replyOf: string | null;
}

export interface SocketConnection {
  username: string;
  connectionId: string | null;
  status: ConnectionStatus;
  publicEncryptKey: string | null;
  messages: Message[];
}
export interface SocketState {
  username: string | null;
  connections: Record<string, SocketConnection>;
}

const socketSlice = createSlice({
  name: "peer",
  initialState: {
    username: null,
    connections: [] as SocketConnection[],
  },
  reducers: {
    updateUserName(state: SocketState, { payload: username }: { payload: string }) {
      state.username = username;
    },
    updateConnectionStatus(
      state: SocketState,
      { payload: { connectionId, status } }: { payload: { connectionId: string; status: ConnectionStatus } }
    ) {
      for (const connection of state.connections) {
        if (connection.connectionId === connectionId) {
          connection.status = status;
          break;
        }
      }
    },

    disconnect(state: SocketState, { payload: connectionId }: { payload: string }) {
      state.connections = state.connections.filter((connection) => connection.connectionId !== connectionId);
    },

    connect(
      state: SocketState,
      { payload: { roomName, username } }: { payload: { roomName: string; username: string } }
    ) {
      state.connections.push({
        roomName,
        username,
        connectionId: null,
        publicEncryptKey: null,
        status: ConnectionStatus.INIT,
        messages: [] as Message[],
      });
    },
  },
});

export const { connect, disconnect, updateUserName } = socketSlice.actions;

export default socketSlice.reducer;
