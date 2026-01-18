import Image from "next/image";
import type { ProfileAvatarProps } from "./type";

export const ProfileAvatar = ({ image, name }: ProfileAvatarProps) => {
  const displayName = name ?? "Unknown";

  return (
    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-sm">
      {image ? (
        <Image src={image} alt={displayName} fill className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-slate-400">
          <span className="text-3xl font-bold">{displayName.charAt(0)}</span>
        </div>
      )}
    </div>
  );
};
