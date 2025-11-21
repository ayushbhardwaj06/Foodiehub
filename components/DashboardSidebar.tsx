"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, PlusCircle, BookOpen, Settings, LogOut, ChefHat } from "lucide-react"
import { SignOutButton } from "./SignOutButton"

export function DashboardSidebar() {
    const pathname = usePathname()

    const links = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "All Recipes", href: "/dashboard/recipes", icon: BookOpen },
        { name: "Add Recipe", href: "/dashboard/create", icon: PlusCircle },
        { name: "Profile", href: "/dashboard/profile", icon: Settings },
    ]

    return (
        <div className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
            <div className="p-6 border-b flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                    <ChefHat className="w-6 h-6 text-primary" />
                </div>
                <span className="font-bold text-xl">FoodHub</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href))

                    return (
                        <Link key={link.href} href={link.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn("w-full justify-start gap-3 mb-1", isActive && "bg-primary/10 text-primary hover:bg-primary/15")}
                            >
                                <Icon className="w-5 h-5" />
                                {link.name}
                            </Button>
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <SignOutButton />
            </div>
        </div>
    )
}
