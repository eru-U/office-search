"use client";

// biome-ignore assist/source/organizeImports: <>
import { profileFetchAction } from "@/actions/profile/profile-fetch-actions";
import { useCallback, useEffect, useState } from "react";
import { ProfileDisplay } from "./components/ProfileDisplay";
import type { ProfileData } from "./components/type";

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchProfileData = useCallback(async () => {
    setIsLoading(true);
    const result = await profileFetchAction();

    // findUnique の結果はオブジェクトまたは null
    if (result) {
      setProfile(result as ProfileData);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800">
            プロフィールが見つかりません
          </h2>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Profile
          </h1>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-blue-500" />
        </header>

        <ProfileDisplay profile={profile} />
      </div>
    </main>
  );
}
