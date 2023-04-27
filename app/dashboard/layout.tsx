import SideLayout from "@/components/sideLayout";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SideLayout>
            {children}
        </SideLayout>
    )
}