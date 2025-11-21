import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Edit } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { DeleteRecipeButton } from "@/components/DeleteRecipeButton"

async function getRecipes() {
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) return []

    return prisma.recipe.findMany({
        orderBy: { createdAt: 'desc' }
    })
}

export default async function DashboardRecipesPage() {
    const recipes = await getRecipes()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">All Recipes</h2>
                    <p className="text-muted-foreground">Manage your recipe collection.</p>
                </div>
                <Link href="/dashboard/create">
                    <Button>Add New Recipe</Button>
                </Link>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Cuisine</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Difficulty</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Rating</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {recipes.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">
                                            No recipes found. Create your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    recipes.map((recipe) => (
                                        <tr key={recipe.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <td className="p-4 align-middle font-medium">{recipe.name}</td>
                                            <td className="p-4 align-middle">{recipe.cuisine}</td>
                                            <td className="p-4 align-middle">
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {recipe.difficulty}
                                                </span>
                                            </td>
                                            <td className="p-4 align-middle flex items-center gap-1">
                                                <Star className="w-3 h-3 fill-current text-amber-500" /> {recipe.rating}
                                            </td>
                                            <td className="p-4 align-middle text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <DeleteRecipeButton id={recipe.id} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
