"use server";

import { prismaClient } from "@terasu/db";

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
};
