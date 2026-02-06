"use client"

import Image from "next/image";
import getTraduction from "../../../shared/services/getTraduction";
import AppIcon from "@/public/images/icon.png"
import Link from "next/link";
import useAuth from "../../hooks/useAuth";
import MyUserCard from "./MyUserCard";
import Button from "../../../shared/ui/common/Button";
import { useParams } from "next/navigation";

export default function Header() {
    const auth = useAuth(),
        {locale} = useParams<{
            locale: string
        }>(),
        traduction = getTraduction(locale)

    return (
        <header className="w-full h-24 container-x-padding flex items-center justify-between fixed top-0 left-0 backdrop-blur-xl z-999999">
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
                    {
                        !auth?.token ? (
                            <>
                                <li>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        href={`/${locale}/auth/login`}
                                    >
                                        {traduction.auth.login}
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        href={`/${locale}/auth/signup`}
                                    >
                                        {traduction.auth.signup}
                                    </Button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <MyUserCard />
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}