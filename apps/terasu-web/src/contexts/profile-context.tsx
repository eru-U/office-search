"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

interface ProfileContextType {
  onRefresh: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

/**
 * プロフィール情報のリフレッシュ関数を提供するプロバイダーです。
 */
export function ProfileProvider({
  children,
  onRefresh,
}: {
  children: ReactNode;
  onRefresh: () => Promise<void>;
}) {
  return (
    <ProfileContext.Provider value={{ onRefresh }}>
      {children}
    </ProfileContext.Provider>
  );
}

/**
 * プロフィール情報のコンテキストを利用するためのフックです。
 */
export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
