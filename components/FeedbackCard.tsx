import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface FeedbackCardProps {
    name: string
    role: string
    content: string
    rating: number
    image: string
}

export function FeedbackCard({ name, role, content, rating, image }: FeedbackCardProps) {
    return (
        <Card className="h-full bg-background/50 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-primary/20">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg leading-none">{name}</h3>
                    <p className="text-sm text-muted-foreground">{role}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < rating ? "fill-primary text-primary" : "fill-muted text-muted-foreground/20"
                                }`}
                        />
                    ))}
                </div>
                <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/10 -z-10 transform -scale-x-100" />
                    <p className="text-muted-foreground italic relative z-10 leading-relaxed">
                        "{content}"
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
