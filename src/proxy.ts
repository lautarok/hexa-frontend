import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/user"]
const ONLY_GUEST_ROUTES = ["/auth"]

export default function AppMiddleware(req: NextRequest) {
    const token = req.cookies.get("auth_token")?.value,
        url = req.nextUrl.clone(),
        urlSegments = url.pathname.split("/"),
        lang = urlSegments[1],
        path = "/" + urlSegments.slice(2).join("/")

    if (lang && !token && PROTECTED_ROUTES.some(route => path.startsWith(route))) {
        return NextResponse.redirect(new URL(`/${lang}/auth/login`, req.url))
    } else if (lang && token && ONLY_GUEST_ROUTES.some(route => path.startsWith(route))) {
        return NextResponse.redirect(new URL(`/${lang}/`, req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/:path*"
    ]
}