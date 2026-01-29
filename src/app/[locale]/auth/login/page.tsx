import getTraduction from "@/src/shared/services/getTraduction"
import LoginForm from "../../../../ui/auth/login/components/form/LoginForm"
import * as Icon from "akar-icons"

export default async function Login({
    params
}: {
    params: Promise<{
        locale: string
    }>
}) {
    const locale = (await params).locale,
        traduction = getTraduction(locale)

    return (
        <div className="w-100 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
            <div className="w-full h-fit flex items-center justify-between">
                <h1 className="text-xl font-bold">{traduction.auth.login}</h1>
                <Icon.VictoryHand className="size-5" />
            </div>
            <div className="w-full h-fit flex flex-col justify-center gap-2">
                <LoginForm />
            </div>
        </div>
    )
}