"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Flame, Star, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecipeCardProps {
    id: string
    title: string
    image: string
    time: string
    calories: number
    rating: number
    author: string
    authorImage?: string
    className?: string
}

export function RecipeCard({
    id,
    title,
    image,
    time,
    calories,
    rating,
    author,
    authorImage,
    className,
}: RecipeCardProps) {
    return (
        <Card className={cn("overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm", className)}>
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:text-red-500 transition-colors shadow-sm h-8 w-8"
                    >
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-12">
                    <div className="flex items-center gap-2 text-white/90 text-xs font-medium">
                        <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" /> {time}
                        </span>
                        <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2 py-1 rounded-full">
                            <Flame className="w-3 h-3" /> {calories} kcal
                        </span>
                    </div>
                </div>
            </div>

            <CardContent className="p-4 pt-5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-semibold text-foreground">{rating}</span>
                        <span className="text-xs text-muted-foreground">(128)</span>
                    </div>
                </div>

                <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                </h3>

                <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-muted overflow-hidden relative">
                        {authorImage ? (
                            <Image src={authorImage} alt={author} fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                                {author.charAt(0)}
                            </div>
                        )}
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">By {author}</span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Link href={`/recipes/${id}`} className="w-full">
                    <Button className="w-full rounded-xl font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        View Recipe
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
