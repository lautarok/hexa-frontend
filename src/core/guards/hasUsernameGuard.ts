import { NextRequest } from "next/server";
import getRequestLocale from "../services/getRequestLocale";
import AppGuard from "../types/appGuard";
import getAuth from "../services/getAuth";
import redirectResponse from "../services/redirectResponse";

export default function hasUsernameGuard(): AppGuard {
    return {
        async canActivate(req: NextRequest) {
            const locale = getRequestLocale(req),
                hasToken = req.cookies.has("auth_token")

            if (!hasToken) {
                return
            } else {
                console.log("2222222222222" + req.nextUrl.pathname)
            }

            const auth = await getAuth()
            if (auth?.user && !auth?.user.credential?.username) {
                return redirectResponse(req, `/${locale}/select-first-username`)
            }
        },
        matchers: [
            /^\/(?!select-first-username).*/
        ]
    }
}