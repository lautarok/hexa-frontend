import setTokenCookie from "@/src/features/auth/services/setTokenCookie"
import googleSignOn from "@/src/features/oauth2/google/services/googleSignOn"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

export async function GET(req: Request, {
    params
}: {
    params: Promise<{
        locale: string
    }>
}) {
    const {searchParams} = new URL(req.url)

    const locale = (await params).locale,
        code = searchParams.get("code")

    const homeRedirect = () => (
        NextResponse.redirect(
            new URL(`/${locale}`, req.url)
        )
    )

    if (!code) {
        return homeRedirect()
    }

    try {
        const response = await googleSignOn(locale, code as string)
        await setTokenCookie(response.token)
        return homeRedirect()
    } catch (error) {
        console.error(error)
        return homeRedirect()
    }
}