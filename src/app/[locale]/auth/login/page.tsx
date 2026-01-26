import getTraduction from "@/src/shared/services/getTraduction"
import LoginForm from "./components/form/LoginForm"

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
        <div className="w-100 max-w-full h-fit py-10 overflow-hidden rounded-xl border-1 border-white/10 flex flex-col gap-7">
            <h1 className="text-xl font-bold px-10">{traduction.auth.login}</h1>
            <div className="w-full h-fit flex flex-col justify-center gap-2">
                <LoginForm />
            </div>
        </div>
    )
}