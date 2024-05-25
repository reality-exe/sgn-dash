"use client";
import { User } from "@/types/PocketBase/User";
import { RecordAuthResponse } from "pocketbase";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [glyph, setGlyph] = useState<string>("Text");
  let [user, setUser] = useState<RecordAuthResponse<User>>();

  return (
    <AppContext.Provider value={{ glyph, setGlyph, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
