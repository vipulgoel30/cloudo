// Third party imports
import { configureStore } from "@reduxjs/toolkit";

// User imports
import peerReducer, { SocketState } from "./socket";

export interface StoreState {
  socket: SocketState;
}

const store = configureStore({
  reducer: {
    socket: peerReducer,
  },
});

export default store;
