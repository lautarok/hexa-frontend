"use client"

import Image from "next/image";
import getTraduction from "../../services/getTraduction";
import AppIcon from "@/public/images/icon.png"
import Link from "next/link";
import LocaleSelector from "../locale/LocaleSelector";
import useAuth from "../../hooks/useAuth";
import Button from "../common/Button";

export default function Header({
    locale,
    traduction
}: {
    locale: string,
    traduction: ReturnType<typeof getTraduction>
}) {
    const auth = useAuth()

    return (
        <header className="w-full h-24 container-x-padding flex items-center justify-between">
            <Link href={`/${locale}`} className="w-fit h-fit flex items-center gap-4">
                <Image
                    alt={traduction.header.iconAlt}
                    src={AppIcon}
                    width={38}
                    height={38}
                />
                <span className="text-2xl font-bold">{traduction.common.appName}</span>
            </Link>
            <nav>
                <ul className="w-fit h-fit flex items-center gap-6 text-md">
                    <li>
                        <LocaleSelector traduction={traduction} />
                    </li>
                    {
                        !auth?.token ? (
                            <>
                                <li>
                                    <Link href={`/${locale}/auth/login`}>{traduction.auth.login}</Link>
                                </li>
                                <li>
                                    <Link href={`/${locale}/auth/signup`} className="px-4 py-2 font-semibold rounded-xl bg-white text-black">{traduction.auth.signup}</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Button onClick={auth.clear}>Cerrar sesión</Button>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}