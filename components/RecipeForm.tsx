"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { createRecipe } from "@/actions/recipe-actions"
import { ImageIcon } from "lucide-react"

export function RecipeForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>(["Dinner"])
    const router = useRouter()

    const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"]

    const toggleMealType = (mealType: string) => {
        setSelectedMealTypes(prev =>
            prev.includes(mealType)
                ? prev.filter(m => m !== mealType)
                : [...prev, mealType]
        )
    }

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData(event.currentTarget)

        // Validate image URL
        const imageUrl = formData.get("image") as string
        if (!imageUrl || !imageUrl.trim()) {
            toast.error("Please provide an image URL")
            setIsLoading(false)
            return
        }

        // Validate meal types
        if (selectedMealTypes.length === 0) {
            toast.error("Please select at least one meal type")
            setIsLoading(false)
            return
        }

        // Parse comma-separated lists
        const ingredients = (formData.get("ingredients") as string)
            .split(',')
            .map(i => i.trim())
            .filter(i => i.length > 0)

        const instructions = (formData.get("instructions") as string)
            .split('\n')
            .map(i => i.trim())
            .filter(i => i.length > 0)

        const tags = (formData.get("tags") as string)
            .split(',')
            .map(t => t.trim())
            .filter(t => t.length > 0)

        // Validate arrays
        if (ingredients.length === 0) {
            toast.error("Please add at least one ingredient")
            setIsLoading(false)
            return
        }

        if (instructions.length === 0) {
            toast.error("Please add at least one instruction")
            setIsLoading(false)
            return
        }

        const data = {
            name: formData.get("name") as string,
            cuisine: formData.get("cuisine") as string,
            difficulty: formData.get("difficulty") as string,
            prepTimeMinutes: Number(formData.get("prepTime")),
            cookTimeMinutes: Number(formData.get("cookTime")),
            servings: Number(formData.get("servings")),
            caloriesPerServing: Number(formData.get("calories")),
            instructions,
            ingredients,
            tags,
            mealType: selectedMealTypes,
            image: imageUrl.trim(),
        }

        try {
            const res = await createRecipe(data)

            if (res.success) {
                toast.success("Recipe created successfully!")
                router.push("/dashboard/recipes")
                router.refresh()
            } else {
                toast.error(res.error || "Failed to create recipe")
            }
        } catch (error) {
            console.error("Recipe creation error:", error)
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="mx-auto">
            <CardHeader>
                <CardTitle>Create New Recipe</CardTitle>
                <CardDescription>
                    Share your culinary creation with the community. All fields are required.
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-6">
                    {/* Recipe Name */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Recipe Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            required
                            placeholder="e.g. Spicy Chicken Wings"
                            minLength={3}
                        />
                    </div>

                    {/* Image URL */}
                    <div className="space-y-2">
                        <Label htmlFor="image" className="flex items-center gap-2">
                            <ImageIcon className="h-4 w-4" />
                            Recipe Image URL *
                        </Label>
                        <Input
                            id="image"
                            name="image"
                            type="url"
                            required
                            placeholder="https://example.com/recipe-image.jpg"
                        />
                        <p className="text-xs text-muted-foreground">
                            Provide a direct link to an image of your recipe (e.g., from Unsplash, Imgur, or your own hosting)
                        </p>
                    </div>

                    {/* Cuisine and Difficulty */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="cuisine">Cuisine *</Label>
                            <Input
                                id="cuisine"
                                name="cuisine"
                                required
                                placeholder="e.g. Italian, Mexican, Asian"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty *</Label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                required
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    {/* Time and Servings */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="prepTime">Prep Time (min) *</Label>
                            <Input
                                id="prepTime"
                                name="prepTime"
                                type="number"
                                required
                                min={1}
                                defaultValue={15}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cookTime">Cook Time (min) *</Label>
                            <Input
                                id="cookTime"
                                name="cookTime"
                                type="number"
                                required
                                min={1}
                                defaultValue={30}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="servings">Servings *</Label>
                            <Input
                                id="servings"
                                name="servings"
                                type="number"
                                required
                                min={1}
                                defaultValue={4}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="calories">Calories *</Label>
                            <Input
                                id="calories"
                                name="calories"
                                type="number"
                                required
                                min={1}
                                defaultValue={300}
                            />
                        </div>
                    </div>

                    {/* Meal Type */}
                    <div className="space-y-2">
                        <Label>Meal Type *</Label>
                        <div className="flex flex-wrap gap-2">
                            {mealTypeOptions.map((mealType) => (
                                <button
                                    key={mealType}
                                    type="button"
                                    onClick={() => toggleMealType(mealType)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedMealTypes.includes(mealType)
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                                        }`}
                                >
                                    {mealType}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Select all that apply
                        </p>
                    </div>

                    {/* Ingredients */}
                    <div className="space-y-2">
                        <Label htmlFor="ingredients">Ingredients *</Label>
                        <Input
                            id="ingredients"
                            name="ingredients"
                            required
                            placeholder="2 lbs chicken, 1 tsp salt, 1/2 cup olive oil, ..."
                        />
                        <p className="text-xs text-muted-foreground">
                            Separate each ingredient with a comma
                        </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags *</Label>
                        <Input
                            id="tags"
                            name="tags"
                            required
                            placeholder="Healthy, Quick, Protein-rich, Gluten-free, ..."
                        />
                        <p className="text-xs text-muted-foreground">
                            Separate tags with commas to help others find your recipe
                        </p>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-2">
                        <Label htmlFor="instructions">Instructions *</Label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            className="flex min-h-[160px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Preheat oven to 375°F&#10;Season chicken with salt and pepper&#10;Bake for 25-30 minutes until golden brown&#10;Let rest for 5 minutes before serving"
                            required
                        />
                        <p className="text-xs text-muted-foreground">
                            Write each step on a new line
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating Recipe..." : "Create Recipe"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
