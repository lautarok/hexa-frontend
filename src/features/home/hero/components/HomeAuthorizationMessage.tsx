"use client"

import useAuth from "@/src/shared/hooks/useAuth"
import getTraduction from "@/src/shared/services/getTraduction"
import * as Icon from "akar-icons"
import { useParams } from "next/navigation"

export default function HomeAuthorizationMessage() {
    const {locale} = useParams<{
        locale: string
    }>()

    const traduction = getTraduction(locale)

    const auth = useAuth()

    return !auth?.token ? (
        <article className="w-full h-fit flex items-center justify-center container-x-padding py-5 bg-yellow-700/5 border-t-1 border-white/10 text-sm font-semibold">
            <div className="w-fit h-fit grid grid-cols-[auto_auto] gap-2 items-center">
                <Icon.InfoFill className="size-5" />
                <p>Hola! Registrate o crea una cuenta para subastar un producto o participar en una subasta</p>
            </div>
        </article>
    ) : null
}