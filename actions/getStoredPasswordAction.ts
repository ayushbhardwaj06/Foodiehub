"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getStoredPasswords() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized.", passwords: [] };
  }

  const passwords = await prisma.password.findMany({
    where: { ownerId: session.user.id },
    select: {
      id: true,
      website: true,
      username: true,
      password: true, // include password so it can display on the frontend
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { error: null, passwords };
}
