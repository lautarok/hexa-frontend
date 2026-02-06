import Footer from "@/src/shared/ui/layout/Footer"
import Header from "@/src/shared/ui/layout/Header"

export default async function ShellLayout({
    children
}: {
    children?: React.ReactNode
}) {
    return (
        <>
            <Header />
                <main className="w-full h-fit min-h-screen pb-15 pt-24 flex items-center flex-col gap-10">
                    {children}
                </main>
            <Footer />
        </>
    )
}