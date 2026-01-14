"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { companyDetailSchema } from "@terasu/schema";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { ClientOnly } from "./shared/client-only";

export const YearlyInfoAddForm = () => {
  const form = useForm<companyDetailSchema.YearlyAddTypes>({
    resolver: zodResolver(companyDetailSchema.yearlyAddSchema),
    defaultValues: {
      dataDate: "",
    },
  });
  return (
    <ClientOnly>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/5 transition-all w-10 h-10"
            title="新しい年度を追加"
          >
            <Plus className="w-5 h-5 text-muted-foreground" />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-100 rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">
              年度の新規追加
            </DialogTitle>
            <DialogDescription>
              新しく情報を記録する年度を選択してください。
            </DialogDescription>
          </DialogHeader>

          <div className="py-8 text-center text-muted-foreground">
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="dataDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel></FormLabel>
                      <FormControl>
                        <Input type="date" placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full mt-4 rounded-full font-black"
                >
                  年度を作成する
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </ClientOnly>
  );
};
