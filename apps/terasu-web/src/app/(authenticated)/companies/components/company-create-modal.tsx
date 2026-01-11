"use client";

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
import { useState } from "react";
import { CompanyCreateForm } from "./company-create-form";

interface CompanyCreateModalProps {
  trigger?: React.ReactNode;
}

export function CompanyCreateModal({ trigger }: CompanyCreateModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="sm" className="rounded-full shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            企業を追加
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>企業の新規登録</DialogTitle>
          <DialogDescription>
            新しくターゲットにする企業を登録します。
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <CompanyCreateForm onSuccess={() => setOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
