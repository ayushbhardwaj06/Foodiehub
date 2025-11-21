import { RecipeForm } from "@/components/RecipeForm"

export default function CreateRecipePage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Add Recipe</h2>
                <p className="text-muted-foreground">Create a new recipe to share with the world.</p>
            </div>
            <RecipeForm />
        </div>
    )
}
