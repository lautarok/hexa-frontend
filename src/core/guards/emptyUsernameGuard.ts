import { NextRequest } from "next/server"
import getRequestLocale from "../services/getRequestLocale"
import getAuth from "../services/getAuth"
import redirectResponse from "../services/redirectResponse"

export default function emptyUsernameGuard() {
    return {
        async canActivate(req: NextRequest) {
            const locale = getRequestLocale(req)

            const auth = await getAuth()
            if (auth?.user.credential?.username) {
                return redirectResponse(req, `/${locale}/`)
            }
        },
        matchers: [
            /^\/select-first-username.*/
        ]
    }
}