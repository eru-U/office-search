export const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="p-4 bg-background border rounded-2xl shadow-sm group hover:border-primary/50 transition-colors">
    <dt className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1 group-hover:text-primary/70">
      {label}
    </dt>
    <dd
      className={`text-sm font-semibold truncate ${value === "未登録" ? "text-muted-foreground/40 font-normal italic" : "text-foreground"}`}
    >
      {value}
    </dd>
  </div>
);
