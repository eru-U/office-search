import { AddQualificationButton } from "./add-qualification-button";
import type { ProfileQualificationsProps } from "./type";

export const ProfileQualifications = ({
  qualifications,
}: ProfileQualificationsProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center text-lg font-bold text-slate-800">
          <span className="mr-2 h-4 w-1 rounded-full bg-blue-500" />
          保有資格
        </h3>
        <AddQualificationButton />
      </div>

      {qualifications.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {qualifications.map((q) => (
            <div
              key={q.id}
              className="flex flex-col rounded-xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-blue-100"
            >
              <span className="font-bold text-slate-700">
                {q.name ?? "名称未設定"}
              </span>
              <span className="mt-2 text-xs font-medium text-slate-400">
                取得日:{" "}
                {q.obtainedDate
                  ? q.obtainedDate.toLocaleDateString()
                  : "未登録"}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-sm text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
          保有資格はまだ登録されていません。
        </div>
      )}
    </div>
  );
};
