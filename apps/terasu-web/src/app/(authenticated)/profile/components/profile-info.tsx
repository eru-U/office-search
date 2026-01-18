import type { ProfileInfoProps } from "./type";

export const ProfileInfo = ({ name, email, createdAt }: ProfileInfoProps) => {
  return (
    <div className="flex flex-col justify-center space-y-1">
      <h2 className="text-2xl font-bold text-slate-900">
        {name ?? "名前未設定"}
      </h2>
      <p className="text-base text-slate-600">
        {email ?? "メールアドレス未設定"}
      </p>
      <div className="flex items-center pt-1">
        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          作成日: {createdAt.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};
