import User from "../../core/types/user"

type Token = {
    token: string
    exp: string
    user: User
}

export default Token