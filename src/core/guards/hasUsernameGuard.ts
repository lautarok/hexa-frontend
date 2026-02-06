import { NextRequest } from "next/server";
import getRequestLocale from "../services/getRequestLocale";
import AppGuard from "../types/appGuard";
import getAuth from "../services/getAuth";
import redirectResponse from "../services/redirectResponse";

export default function hasUsernameGuard(): AppGuard {
    return {
        async canActivate(req: NextRequest) {
            const locale = getRequestLocale(req)

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