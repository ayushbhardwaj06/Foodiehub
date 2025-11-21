import { Button } from "@/components/ui/button"
import { Clock, Flame, Star, Users, ArrowLeft, ChefHat, Share2, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

async function getRecipe(id: string) {
    try {
        const recipe = await prisma.recipe.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        role: true
                    }
                }
            }
        })
        return recipe
    } catch (error) {
        console.error("Failed to fetch recipe:", error)
        return null
    }
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const recipe = await getRecipe(id)

    if (!recipe) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            {/* Hero Section */}
            <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    fill
                    className="object-cover"
                    priority
                />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 container mx-auto">
                    <div className="animate-in slide-in-from-bottom-10 duration-700 fade-in">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="backdrop-blur-md bg-background/30 text-foreground border-none">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground drop-shadow-lg">
                            {recipe.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-foreground/90 font-medium">
                            <div className="flex items-center gap-2 backdrop-blur-md bg-background/20 px-3 py-1.5 rounded-full">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span>{recipe.rating} ({recipe.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 backdrop-blur-md bg-background/20 px-3 py-1.5 rounded-full">
                                <Clock className="w-5 h-5" />
                                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                            </div>
                            <div className="flex items-center gap-2 backdrop-blur-md bg-background/20 px-3 py-1.5 rounded-full">
                                <Flame className="w-5 h-5" />
                                <span>{recipe.caloriesPerServing} kcal</span>
                            </div>
                            <div className="flex items-center gap-2 backdrop-blur-md bg-background/20 px-3 py-1.5 rounded-full">
                                <Users className="w-5 h-5" />
                                <span>{recipe.servings} servings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 mt-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Ingredients */}
                        <section className="animate-in slide-in-from-bottom-8 duration-700 delay-200">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <Utensils className="w-5 h-5" />
                                </span>
                                Ingredients
                            </h2>
                            <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {recipe.ingredients.map((ingredient, index) => (
                                            <li key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                                <span className="text-muted-foreground">{ingredient}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </section>

                        {/* Instructions */}
                        <section className="animate-in slide-in-from-bottom-8 duration-700 delay-400">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <span className="bg-primary/10 p-2 rounded-lg text-primary">
                                    <ChefHat className="w-5 h-5" />
                                </span>
                                Instructions
                            </h2>
                            <div className="space-y-6">
                                {recipe.instructions.map((step, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                {index + 1}
                                            </div>
                                            {index !== recipe.instructions.length - 1 && (
                                                <div className="w-px h-full bg-border my-2" />
                                            )}
                                        </div>
                                        <Card className="flex-1 border-none shadow-md hover:shadow-lg transition-all bg-card/50 backdrop-blur-sm mb-4">
                                            <CardContent className="p-6">
                                                <p className="text-muted-foreground leading-relaxed">{step}</p>
                                            </CardContent>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8 animate-in slide-in-from-right-8 duration-700 delay-600">
                        {/* Chef Info */}
                        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm overflow-hidden">
                            <div className="h-24 bg-gradient-to-r from-primary/20 to-primary/5" />
                            <CardContent className="relative pt-0 pb-6 px-6 text-center">
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                    <div className="w-24 h-24 rounded-full border-4 border-background overflow-hidden shadow-xl">
                                        <Image
                                            src={recipe.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipe.userId}`}
                                            alt={recipe.user.name}
                                            width={96}
                                            height={96}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                <div className="mt-14 space-y-2">
                                    <h3 className="font-bold text-lg">{recipe.user.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {recipe.user.role === 'SUPERADMIN' ? 'Master Chef' : recipe.user.role === 'ADMIN' ? 'Professional Chef' : 'Home Cook'}
                                    </p>
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {recipe.user.email}
                                    </div>
                                    <Button className="w-full rounded-full mt-4">Follow Chef</Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Details */}
                        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-6 space-y-4">
                                <h3 className="font-bold text-lg mb-4">Recipe Details</h3>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Difficulty</span>
                                    <Badge variant={recipe.difficulty === 'Easy' ? 'secondary' : 'destructive'}>
                                        {recipe.difficulty}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Cuisine</span>
                                    <span className="font-medium">{recipe.cuisine}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Calories</span>
                                    <span className="font-medium">{recipe.caloriesPerServing} kcal</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b">
                                    <span className="text-muted-foreground">Meal Type</span>
                                    <div className="flex flex-wrap gap-1 justify-end">
                                        {recipe.mealType.map((type) => (
                                            <Badge key={type} variant="outline" className="text-xs">
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-6">
                                    <Button variant="outline" className="flex-1 gap-2">
                                        <Heart className="w-4 h-4" /> Save
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2">
                                        <Share2 className="w-4 h-4" /> Share
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}

function Utensils(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
    )
}
