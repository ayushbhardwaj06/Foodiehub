"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function addStoragePasswordAction(formData: FormData) {
  const website = String(formData.get("website"));
  if (!website) return { error: "Please enter the website." };

  const username = String(formData.get("username"));
  if (!username) return { error: "Please enter the username." };

  const password = String(formData.get("password"));
  if (!password) return { error: "Please enter the password." };

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized." };
  }

  try {
    await prisma.password.create({
      data: {
        website,
        username,
        password,
        ownerId: session.user.id,
      },
    });

    return { error: null };
  } catch (err) {
    console.error(err);
    return { error: "Failed to save password." };
  }
}
