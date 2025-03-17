"use client";

// Third party imports
import { Provider } from "react-redux";

// User imports
import store from "./store";

export default function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
