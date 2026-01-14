// biome-ignore assist/source/organizeImports: <>
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

interface TrashButtonProps {
  onClick: () => void;
  className?: string;
}

export const TrashButton = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors duration-200",
        className,
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Trash className="w-4 h-4" />
    </Button>
  );
};
