import { AddTechStackButton } from "./techStack-add-button";
import type { ProfileTechStackProps } from "../type";

export const ProfileTechStack = ({ userTechs }: ProfileTechStackProps) => {
  const calculateExperience = (startedAt: Date | null): string => {
    if (!startedAt) return "期間未登録";
    const now = new Date();
    const start = new Date(startedAt);
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    if (years === 0 && months === 0) return "1ヶ月未満";
    if (years === 0) return `${months}ヶ月`;
    if (months === 0) return `${years}年`;
    return `${years}年 ${months}ヶ月`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-lg font-bold text-slate-800">
          <span className="mr-2 h-4 w-1 rounded-full bg-blue-500" />
          所持技術スタック
        </h3>
        <AddTechStackButton />
      </div>

      {userTechs.length > 0 ? (
        <div className="space-y-4">
          {userTechs.map((tech, index) => (
            <div
              key={`${tech.techStack.id}-${index}`}
              className="relative group rounded-xl border border-slate-200 bg-white p-6 transition-all hover:border-blue-200 hover:bg-blue-50/30"
            >
              <div className="absolute top-6 right-6">
                <span className="inline-flex items-center rounded-md bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  {calculateExperience(tech.startedAt)}
                </span>
              </div>
              <div className="pr-28">
                <h4 className="text-lg font-bold text-slate-800">
                  {tech.techStack.name ?? "不明"}
                </h4>
                {tech.note && (
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {tech.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
          技術スタックはまだ登録されていません。
        </div>
      )}
    </div>
  );
};
