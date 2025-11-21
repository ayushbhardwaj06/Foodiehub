"use client"

import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { deleteRecipe } from "@/actions/recipe-actions"
import { toast } from "sonner"
import { useState } from "react"

export function DeleteRecipeButton({ id }: { id: string }) {
    const [isPending, setIsPending] = useState(false)

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this recipe?")) return

        setIsPending(true)
        try {
            const res = await deleteRecipe(id)
            if (res.success) {
                toast.success("Recipe deleted")
            } else {
                toast.error("Failed to delete recipe")
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsPending(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={handleDelete}
            disabled={isPending}
        >
            <Trash className="w-4 h-4" />
        </Button>
    )
}
