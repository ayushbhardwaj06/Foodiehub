import { DashboardSidebar } from "@/components/DashboardSidebar"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const headersList = await headers();

    const session = await auth.api.getSession({
        headers: headersList,
    });

    if (!session) {
        return redirect("/")
    }

    if (session?.user?.role !== "SUPERADMIN") {
        return redirect("/")
    }
    return (
        <div className="flex min-h-screen bg-background">
            <aside className="hidden md:block">
                <DashboardSidebar />
            </aside>
            <main className="flex-1 overflow-y-auto">
                <div className="md:hidden p-4 border-b bg-card">
                    {/* Mobile header placeholder - can be expanded later */}
                    <span className="font-bold">FoodHub Dashboard</span>
                </div>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
