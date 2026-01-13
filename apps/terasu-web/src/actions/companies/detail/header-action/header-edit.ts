"use server";

import { prismaClient } from "@terasu/db";
import { revalidatePath } from "next/cache";

export const headerEditAction = async (data: {
  id: string;
  name: string;
  websiteUrl: string;
}) => {
  await prismaClient.company.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      websiteUrl: data.websiteUrl,
    },
  });
  revalidatePath(`/companies/${data.id}`);
};
