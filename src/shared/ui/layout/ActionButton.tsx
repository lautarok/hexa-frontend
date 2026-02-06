"use client"

import getTraduction from "@/src/shared/services/getTraduction"
import Button from "@/src/shared/ui/common/Button"
import { useParams, usePathname } from "next/navigation"

export default function ActionButton() {
    const pathname = usePathname(),
        params = useParams<{
            locale: string
        }>(),
        segment = pathname.split("/").filter(Boolean).pop(),
        traduction = getTraduction(params.locale)

    return segment === "login" ? (
        <Button
            size="sm"
            variant="primary"
            href={`/${params.locale}/auth/signup`}
        >
            {traduction.auth.signup}
        </Button>
    ) : (
        <Button
            size="sm"
            variant="primary"
            href={`/${params.locale}/auth/login`}
        >
            {traduction.auth.login}
        </Button>
    )
}