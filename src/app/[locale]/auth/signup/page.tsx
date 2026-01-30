import getTraduction from "@/src/shared/services/getTraduction"
import SignupForm from "@/src/ui/auth/signup/components/form/SignupForm"
import * as Icon from "akar-icons"

export default async function Signup({
    params
}: {
    params: Promise<{
        locale: string
    }>
}) {
    const locale = (await params).locale,
        traduction = getTraduction(locale)
    
    return (
        <SignupForm />
    )
}