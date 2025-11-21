"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createRecipe(data: {
    name: string
    cuisine: string
    difficulty: string
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    caloriesPerServing: number
    instructions: string[]
    ingredients: string[]
    tags: string[]
    mealType: string[]
    image: string
}) {
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const recipe = await prisma.recipe.create({
            data: {
                ...data,
                userId: session.user.id,
                rating: 4.5, // Default rating for new recipes
                reviewCount: 0,
            }
        })



        return { success: true, recipe }
    } catch (error) {
        console.error("Failed to create recipe:", error)
        return { success: false, error: "Failed to create recipe" }
    }
}

export async function deleteRecipe(id: string) {
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        await prisma.recipe.delete({
            where: {
                id,
            }
        })



        return { success: true }
    } catch (error) {
        console.error("Failed to delete recipe:", error)
        return { success: false, error: "Failed to delete recipe" }
    }
}

export async function getDashboardStats() {
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        throw new Error("Unauthorized")
    }

    const [totalRecipes, recentRecipes] = await Promise.all([
        prisma.recipe.count(),
        prisma.recipe.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5
        })
    ])

    return {
        totalRecipes,
        avgRating: 4.8, // Placeholder as we don't have reviews yet
        totalViews: 1250, // Placeholder
        recentRecipes
    }
}
