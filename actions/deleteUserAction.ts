"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteUserAction({ userId }: { userId: string }) {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) throw new Error("Unauthorized");

  // Only SUPERADMIN can delete ADMIN or USER, ADMIN can only delete USER
  const isSuperAdmin = session.user.role === "SUPERADMIN";
  const isAdmin = session.user.role === "ADMIN";
  if (!isSuperAdmin && !isAdmin) {
    throw new Error("Forbidden");
  }

  // Fetch the target user's role
  const targetUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  if (!targetUser) throw new Error("User not found");

  if (isAdmin && targetUser.role !== "USER") {
    throw new Error("Forbidden");
  }
  if (isSuperAdmin && targetUser.role === "SUPERADMIN") {
    throw new Error("Cannot delete another SUPERADMIN");
  }

  try {
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (session.user.id === userId) {
      await auth.api.signOut({ headers: headersList });
      redirect("/auth/sign-in");
    }

    revalidatePath("/dashboard/admin");
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Internal Server Error" };
  }
}
