"use client";

import socket from "@/socket";
import { SocketConnection } from "@/store/socket";
import { StoreState } from "@/store/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

// Core imports

// User imports
function Connect() {}

export default function Peer() {
  const router = useRouter();
  const username: string | null = useSelector((state: StoreState) => state.socket.username);
  const connections: SocketConnection[] = useSelector((state: StoreState) => state.socket.connections);

  useEffect(() => {
    if (username === null) router.replace("/peer/connect");
  }, [username, router]);

  useEffect(() => {
    socket.emit("join-room", username);
  }, [username]);

  return <div></div>;
}
