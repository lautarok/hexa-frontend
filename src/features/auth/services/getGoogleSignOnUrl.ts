import * as http from "@/src/shared/services/http";
import Url from "@/src/shared/types/url";

export default function getGoogleSignOnUrl({
    locale
}: {
    locale: string
}) {
    return http.GET<Url>("oauth2/google-url", {
        searchParams: {locale} 
    })
}