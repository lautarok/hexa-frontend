import Credential from "@/src/core/types/credential"
import * as http from "@/src/shared/services/http"

export default async function updateUsernameService({
    userId,
    token,
    username
}: {
    userId: string
    token: string
    username: string
}) {
    const response = await http.PUT<Credential>("users/username", {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: {userId, username}
    })

    return response
}