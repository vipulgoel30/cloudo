"use client";
// Core imports
import { useRouter } from "next/navigation";
import { FormEvent, useRef } from "react";

// Third party imports
import { useDispatch } from "react-redux";

// User imports
import { updateUserName } from "@/store/socket";

export default function PeerConnect() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userNameRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userName: string | undefined = userNameRef.current?.value?.trim();
    if (userName) {
      dispatch(updateUserName(userName));
      router.replace("/peer");
    }
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <label htmlFor="username">User name</label>
      <input type="text" name="username" ref={userNameRef} placeholder="vipulgoel30" />
      <button type="submit">Submit</button>
    </form>
  );
}
