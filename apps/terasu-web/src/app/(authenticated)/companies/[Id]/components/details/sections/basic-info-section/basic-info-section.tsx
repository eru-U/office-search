import { InfoBox } from "../../shared/info-box";
import type { YearlyDetailItem } from "../../types";
import { BasicInfoEditModal } from "./basic-info-edit-modal";

export const BasicInfoSection = ({ data }: { data: YearlyDetailItem }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between border-l-4 border-primary pl-4">
        <h2 className="text-2xl font-bold">基本情報</h2>
        {/* ★ 編集ボタンをモーダルに差し替え */}
        {/* <BasicInfoEditModal data={data} onRefresh={onRefresh} /> */}
        <BasicInfoEditModal data={data} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InfoBox
          label="設立年月日"
          value={
            data.company.establishedDate
              ? data.company.establishedDate.toLocaleDateString()
              : "未登録"
          }
        />
        <InfoBox
          label="資本金"
          value={
            data.company.capital
              ? `${data.company.capital.toLocaleString()} 円`
              : "未登録"
          }
        />
        <InfoBox label="代表者名" value={data.representative || "未登録"} />
        <InfoBox
          label="社員数"
          value={
            data.employeeCount
              ? `${data.employeeCount.toLocaleString()} 名`
              : "未登録"
          }
        />
        <InfoBox
          label="電話番号"
          value={data.company.phoneNumber || "未登録"}
        />
        <InfoBox
          label="売上高"
          value={
            data.revenue ? `${data.revenue.toLocaleString()} 円` : "未登録"
          }
        />
      </div>
    </section>
  );
};
