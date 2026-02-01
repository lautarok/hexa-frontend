"use client"

import getTraduction from "@/src/shared/services/getTraduction"
import { useParams } from "next/navigation"

export default function HomeWelcome() {
    const {locale} = useParams<{
        locale: string
    }>()

    const traduction = getTraduction(locale)

    return (
        <article className="w-full h-fit flex flex-col gap-2 container-x-padding py-20 bg-black/10 border-t-1 border-b-1 border-white/10">
            <h1 className="text-3xl font-bold">{traduction.home.heroTitle}</h1>
            <p className="text-xl">{traduction.home.heroDescription}</p>
        </article>
    )
}