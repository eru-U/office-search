import { ProfileAvatar } from "./profile-avatar";
import { ProfileInfo } from "./profile-info";
import { ProfileQualifications } from "./qualification/profile-qualifications";
import { ProfileTechStack } from "./tech-stack/profile-techStack";
import type { ProfileData } from "./type";

export const ProfileDisplay = ({ profile }: { profile: ProfileData }) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* ヘッダーカード: アイコンと基本情報を横並びに */}
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:items-start">
        <ProfileAvatar image={profile.image} name={profile.name} />
        <ProfileInfo
          name={profile.name}
          email={profile.email}
          createdAt={profile.createdAt}
        />
      </div>

      {/* 詳細情報セクション: 言葉ではなく実績で語るスタイル */}
      <div className="grid grid-cols-1 gap-4 pt-4">
        <ProfileQualifications qualifications={profile.qualifications} />
        <div className="border-t border-slate-100" />
        <ProfileTechStack userTechs={profile.userTechs} />
      </div>
    </div>
  );
};
