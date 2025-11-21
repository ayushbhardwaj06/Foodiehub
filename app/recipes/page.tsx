import { RecipeCard } from "@/components/RecipeCard"
import { Input } from "@/components/ui/input"
import { prisma } from "@/lib/prisma"
import { Search } from "lucide-react"

async function getRecipes(query?: string) {
  try {
    const recipes = await prisma.recipe.findMany({
      where: query
        ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { cuisine: { contains: query, mode: "insensitive" } },
            { ingredients: { hasSome: [query] } }
          ]
        }
        : undefined,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    })

    return recipes
  } catch (error) {
    console.error("Failed to fetch recipes:", error)
    return []
  }
}



export default async function RecipesPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const q = searchParams.q || ""
  const recipes = await getRecipes(q)

  return (
    <main className="min-h-screen bg-background pt-24 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Recipes</h1>
            <p className="text-muted-foreground">
              Browse our collection of delicious recipes
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <form>
              <Input
                name="q"
                placeholder="Search recipes, ingredients..."
                className="pl-9"
                defaultValue={q}
              />
            </form>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No recipes found matching your search.
            </div>
          ) : (
            recipes.map((recipe: any) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.name}
                image={recipe.image}
                time={`${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min`}
                calories={recipe.caloriesPerServing}
                rating={recipe.rating}
                author={recipe.user.name}
                authorImage={recipe.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.userId}`}
              />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
