import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AlertCircle, Trash } from "lucide-react";
import React, { useCallback, useState } from "react";

interface TrashButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onAction?: () => void; // 2回目に実行したい関数
}

export const TrashButton = React.forwardRef<
  HTMLButtonElement,
  TrashButtonProps
>(({ className, onAction, ...props }, ref) => {
  const [isConfirming, setIsConfirming] = useState(false);

  // ========================================
  // マウスが離れたら即座にリセット
  // ========================================
  const handleMouseLeave = useCallback(() => {
    setIsConfirming(false);
  }, []);

  // ========================================
  // クリックハンドラ
  // ========================================
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault(); // 念のためデフォルトの挙動（送信など）を防止
      e.stopPropagation(); // バブリングを止める

      if (!isConfirming) {
        setIsConfirming(true);
      } else {
        onAction?.();
        setIsConfirming(false);
      }
    },
    [isConfirming, onAction],
  );

  return (
    <Button
      ref={ref}
      type="button"
      variant={isConfirming ? "destructive" : "ghost"}
      size={isConfirming ? "default" : "icon"}
      onMouseLeave={handleMouseLeave} // 💡 ここが今回のキモ！
      onClick={handleClick}
      className={cn(
        "transition-all duration-200 ease-in-out font-bold overflow-hidden",
        isConfirming
          ? "w-25 h-8 text-[10px] px-2 gap-1 animate-in fade-in zoom-in-90" // w-25ルール遵守
          : "h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50",
        className,
      )}
      {...props}
    >
      {isConfirming ? (
        <div className="flex items-center gap-1 shrink-0">
          <AlertCircle className="w-3 h-3" />
          <span>Delete?</span>
        </div>
      ) : (
        <Trash className="w-4 h-4 shrink-0" />
      )}
    </Button>
  );
});

TrashButton.displayName = "TrashButton";
