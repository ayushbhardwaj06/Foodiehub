import { Button } from "@/components/ui/button"
import { RecipeCard } from "@/components/RecipeCard"
import { FeedbackCard } from "@/components/FeedbackCard"
import { ArrowRight, ChefHat, Star, Utensils, Users } from "lucide-react"
import Link from "next/link"
import { prisma } from "@/lib/prisma"

async function getFeaturedRecipes() {
  try {
    const featuresRecepies = await prisma.recipe.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      take: 8,
      orderBy: { rating: 'desc' }
    })
    return featuresRecepies
  } catch (error: any) {
    console.log(error)
    throw new Error("Failed to fetch featured recipes")
  }
}

export default async function Page() {
  const featuredRecipes = await getFeaturedRecipes()

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative lg:h-[105vh]  flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070')] bg-cover bg-center opacity-20 animate-zoom-in" />

        <div className="container relative z-20 mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="inline-flex  items-center rounded-full mt-20 border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 animate-fade-in">
            <span className="  h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            #1 Food Community
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter animate-slide-in-up">
            Discover the Art of <br />
            <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
              Culinary Excellence
            </span>
          </h1>

          <p className="max-w-[700px] text-muted-foreground md:text-xl animate-slide-in-up delay-100">
            Explore thousands of premium recipes, learn from expert chefs, and transform your kitchen into a culinary haven.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-up delay-200">
            <Link href="/recipes">
              <Button size="lg" className="h-12 px-8 rounded-full text-lg gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                Explore Recipes <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="outline" size="lg" className="h-12 px-8 rounded-full text-lg backdrop-blur-sm bg-background/50">
                Join Community
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in delay-300">
            {[
              { label: "Recipes", value: "10k+", icon: Utensils },
              { label: "Chefs", value: "500+", icon: ChefHat },
              { label: "Reviews", value: "50k+", icon: Star },
              { label: "Daily Users", value: "2k+", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border shadow-sm hover:scale-105 transition-transform">
                <stat.icon className="w-6 h-6 text-primary" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">Featured Recipes</h2>
              <p className="text-muted-foreground">Hand-picked recipes for you to try today</p>
            </div>
            <Link href="/recipes">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRecipes.map((recipe) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left scale-110" />
        <div className="container relative mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What Our Community Says</h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied foodies who have found their culinary home with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Home Cook",
                content: "FoodHub has completely transformed how I cook! The recipes are easy to follow and the results are always delicious. It's my go-to app for dinner ideas.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887"
              },
              {
                name: "Michael Chen",
                role: "Professional Chef",
                content: "I love sharing my culinary creations here. The community is so supportive and passionate about food. The platform tools make it easy to showcase my work.",
                rating: 5,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887"
              },
              {
                name: "Emily Davis",
                role: "Food Enthusiast",
                content: "The best place to find inspiration for my weekly meal prep. The variety of cuisines and dietary options is impressive. Highly recommended!",
                rating: 4,
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770"
              }
            ].map((feedback, i) => (
              <FeedbackCard key={i} {...feedback} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
