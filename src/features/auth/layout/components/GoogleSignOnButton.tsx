"use server"

import * as Icon from "akar-icons"
import getGoogleSignOnUrl from "../../services/getGoogleSignOnUrl"
import Link from "next/link"

export default async function GoogleSignOnButton({
    locale
}: {
    locale: string
}) {
    try {
        const {url} = await getGoogleSignOnUrl({locale})

        return (
            <Link href={url} className="w-fit h-fit grid grid-cols-[auto_1fr] gap-2 rounded-full text-black text-md font-semibold flex items-center p-2 pr-4 hover:scale-102 duration-200 active:scale-98 transition-scale origin-center" style={{
                background: "linear-gradient(45deg, #ffd54f, #f48fb1, #80deea)"
            }}>
                <Icon.GoogleFill className="size-6" />
                <span>Ingresar con Google</span>
            </Link>
        )
    } catch {
        return (
            <div className="w-fit h-fit grid grid-cols-[auto_1fr_auto] gap-2 rounded-full text-md font-semibold flex items-center p-2 pr-4 duration-200 transition-scale origin-center opacity-50 bg-red-500 text-white">
                <Icon.GoogleFill className="size-6" />
                <span>Ingresar con Google</span>
                <Icon.Stop className="size-6" />
            </div>
        )
    }
}