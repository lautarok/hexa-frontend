import { NextRequest } from "next/server";
import getRequestLocale from "../services/getRequestLocale";
import getAuth from "../services/getAuth";
import AppGuard from "../types/appGuard";
import redirectResponse from "../services/redirectResponse";

export default function guestGuard(): AppGuard {
    return {
        async canActivate(req: NextRequest) {
            const hasToken = req.cookies.has("auth_token"),
                locale = getRequestLocale(req)

            if (hasToken) {
                return redirectResponse(req, `/${locale}/`)
            }
        },
        matchers: [
            /^\/auth.*/
        ]
    }
}