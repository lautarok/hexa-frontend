import { NextRequest, NextResponse } from "next/server";
import AppGuard from "../types/appGuard";

export default async function runGuards(req: NextRequest, guards: AppGuard[]) {
    if (req.method !== "GET") {
        return NextResponse.next()
    }

    const pathname = "/" + req.nextUrl.pathname.split("/").slice(2).filter(Boolean).join("/")

    for (const guard of guards) {
        if (guard.matchers?.some(matcher => matcher.test(pathname))) {
            const guardResult = await guard.canActivate?.(req)
            if (guardResult) {
                return guardResult
            }
        }
    }

    return NextResponse.next()
}