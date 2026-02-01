"use client"

import useAuth from "@/src/shared/hooks/useAuth"
import getTraduction from "@/src/shared/services/getTraduction"
import Button from "@/src/shared/ui/common/Button"
import { useParams } from "next/navigation"

export default function HomeAuthorizationMessage() {
    const {locale} = useParams<{
        locale: string
    }>()

    const traduction = getTraduction(locale)

    const auth = useAuth()

    return !auth?.token ? (
        <article className="w-full h-fit flex items-center justify-center gap-5 container-x-padding py-5 bg-yellow-700/5 border-b-1 border-white/10">
            <p className="text-md max-w-90 text-right">Registrate o crea una cuenta para subastar un producto o participar en una subasta</p>
            <nav className="w-fit flex items-center flex-wrap gap-3">
            <div className="w-fit h-fit">
                <Button
                    href={`/${locale}/auth/login`}
                    size="sm"
                >{traduction.auth.login}</Button>
            </div>
            <div className="w-fit h-fit">
                <Button
                    href={`/${locale}/auth/signup`}
                    variant="primary"
                size="sm"
                >{traduction.auth.signup}</Button>
            </div>
            </nav>
        </article>
    ) : null
}