import { NextRequest } from "next/server";
import getRequestLocale from "../services/getRequestLocale";
import AppGuard from "../types/appGuard";
import redirectResponse from "../services/redirectResponse";

export default function authGuard(): AppGuard {
    return {
        async canActivate(req: NextRequest) {
            const token = req.cookies.get("auth_token")?.value,
                locale = getRequestLocale(req)

            if (!token) {
                return redirectResponse(req, `/${locale}/`)
            }
        },
        matchers: [
            /^\/select-first-username.*/
        ]
    }
}