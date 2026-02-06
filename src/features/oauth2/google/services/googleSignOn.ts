import * as http from "@/src/shared/services/http";
import Token from "@/src/shared/types/token";

export default function googleSignOn(locale: string, code: string) {
    return http.POST<Token>("oauth2/google-sign-on", {
        searchParams: {locale},
        body: {code}
    })
}