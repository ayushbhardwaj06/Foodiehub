"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export default async function deleteStoragePasswordAction(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized." };
  }

  try {
    // Delete the password entry if it belongs to the user
    const deleted = await prisma.password.deleteMany({
      where: {
        id,
        ownerId: session.user.id,
      },
    });

    if (deleted.count === 0) {
      return { error: "Password entry not found or not authorized." };
    }

    return { error: null };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete password." };
  }
}
