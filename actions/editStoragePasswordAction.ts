"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

type EditPasswordParams = {
  id: string;
  website: string;
  username: string;
  password: string;
};

export async function editStoragePasswordAction({
  id,
  website,
  username,
  password,
}: EditPasswordParams) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized." };
  }

  try {
    const updated = await prisma.password.updateMany({
      where: {
        id,
        ownerId: session.user.id,
      },
      data: {
        website,
        username,
        password,
      },
    });

    if (updated.count === 0) {
      return { error: "Password entry not found or not authorized." };
    }

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update password." };
  }
}
