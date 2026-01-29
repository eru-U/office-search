// apps/terasu-web/src/components/star-rating.tsx
"use client";

// biome-ignore assist/source/organizeImports: <>
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import type { FC } from "react";

interface StarRatingProps {
  /**
   * 現在の値 (0〜max)
   */
  value: number;
  /**
   * 値が変更されたときに呼ばれる関数 (入力用)
   */
  onChange?: (value: number) => void;
  /**
   * 最大の星の数 (デフォルト: 5)
   */
  max?: number;
  /**
   * 読み取り専用モード (表示用)
   */
  readOnly?: boolean;
  /**
   * 追加のクラス名
   */
  className?: string;
}

/**
 * 星評価コンポーネント
 * 入力用・表示用両対応
 */
export const StarRating: FC<StarRatingProps> = ({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  className,
}) => {
  // 1からmaxまでの配列を作成 [1, 2, 3, 4, 5]
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  /**
   * 星がクリックされたときの処理
   */
  const handleClick = (rating: number) => {
    // 読み取り専用でなく、onChange関数が渡されている場合のみ実行
    if (!readOnly && onChange) {
      // すでに同じ値が選択されていたら0に戻す（トグル動作）オプションも考えられるが、
      // 今回はシンプルにクリックした値を設定する
      onChange(rating);
    }
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {stars.map((starValue) => {
        // 現在の値が、この星の値以上であればアクティブ（黄色）とする
        // 例: valueが3の場合、starValueが1, 2, 3の星がアクティブになる
        const isActive = starValue <= (value || 0);

        return (
          <button
            key={starValue}
            type="button" // form内でsubmitされないように必須
            disabled={readOnly} // 読み取り専用なら無効化
            onClick={() => handleClick(starValue)}
            className={cn(
              // 基本スタイル
              "focus:outline-none transition-transform p-0.5",
              // インタラクティブな場合のスタイル
              !readOnly && "cursor-pointer hover:scale-110 active:scale-95",
              // 読み取り専用の場合のスタイル
              readOnly && "cursor-default",
            )}
            aria-label={`${starValue} / ${max} 評価`}
          >
            <Star
              // サイズを設定
              className={cn(
                "w-6 h-6",
                isActive
                  ? "text-yellow-400 fill-yellow-400" // アクティブ: 黄色で塗りつぶし
                  : "text-gray-200 fill-gray-100", // 非アクティブ: 薄いグレー
              )}
            />
          </button>
        );
      })}
      {/* アクセシビリティ用のテキスト（視覚的には隠す） */}
      <span className="sr-only">
        {value} / {max} の評価
      </span>
    </div>
  );
};
