import getTraduction from "@/src/shared/services/getTraduction"

export default async function Signup({
    params
}: {
    params: Promise<{
        locale: string
    }>
}) {
    const locale = (await params).locale,
        traduction = getTraduction(locale)
    
    return <main className="min-h-[calc(100dvh-13rem)] flex items-center justify-center">
        <h1 className="text-xl font-bold text-green-100">{traduction.auth.signup} page</h1>
    </main>
}