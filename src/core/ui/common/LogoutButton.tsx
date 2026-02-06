"use client"

import Button from "@/src/shared/ui/common/Button"
import useAuth from "../../hooks/useAuth"
import { useParams, useRouter } from "next/navigation"

export default function LogoutButton(
    props: Omit<Parameters<typeof Button>[0], 'children' | 'onClick'>
) {
    const auth = useAuth(),
        router = useRouter(),
        locale = useParams<{
            locale: string
        }>().locale

    return (
        <Button
            onClick={async () => {
                await auth?.clear()
                router.push(`/${locale}/auth/login`)
            }}
            {...props}
        >
            Cerrar sesión
        </Button>
    )
}