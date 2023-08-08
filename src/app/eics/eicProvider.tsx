"use client";

import { createContext, useContext } from "react";

export const EicContext = createContext({
  isAuthed: false,
  name: "",
  permission: 0,
  id: "",
  token: "",
});

export function useEicContext() {
  return useContext(EicContext);
}
