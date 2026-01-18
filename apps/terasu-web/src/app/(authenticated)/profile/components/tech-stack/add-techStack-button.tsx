// biome-ignore assist/source/organizeImports: <>
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export const AddTechStackButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full gap-1 font-bold hover:bg-primary/5 transition-all active:scale-95"
          title="技術スタックを追加"
        >
          <Plus className="w-4 h-4" /> 追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>技術スタックの追加</DialogTitle>
          <DialogDescription>
            新しい技術スタックを追加して、あなたの経験を最新の状態に保ちましょう。
          </DialogDescription>
        </DialogHeader>
        {/* ここにフォームを実装予定 */}
        <div className="py-6 text-center text-slate-500 border border-dashed rounded-lg">
          フォームは次のステップで実装します
        </div>
      </DialogContent>
    </Dialog>
  );
};
