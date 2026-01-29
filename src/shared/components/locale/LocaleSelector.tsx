"use client"

import { usePathname } from "next/navigation";
import getTraduction from "../../services/getTraduction";
import * as Icon from "akar-icons"
import { useMemo } from "react";
import DropdownMenu from "../dropdown/DropdownMenu";
import DropdownMenuTitle from "../dropdown/DropdownMenuTitle";
import DropdownMenuLink from "../dropdown/DropdownMenuLink";
import DropdownMenuBox from "../dropdown/DropdownMenuBox";

export default function LocaleSelector({
    traduction,
    boxAlignmentX = "right",
    discrete = false
}: {
    traduction: ReturnType<typeof getTraduction>
    boxAlignmentX?: "center" | "left" | "right"
    discrete?: boolean
}) {
    const pathname = usePathname()

    const pathnameSuffix = useMemo(() => {
        return pathname.split("/").filter(Boolean).slice(1).join("/")
    }, [pathname])

    return (
        <DropdownMenu label={
            <div className="w-fit h-fit flex items-center gap-2">
                {
                    !discrete ? (
                        <Icon.Globe size={18} />
                    ) : null
                }
                <span
                    className={[
                        discrete ? "opacity-70 transition-opacity hover:opacity-100" : ""
                    ].join(" ")}
                >{traduction.language.currentLocale}</span>
            </div>
        }>
            <DropdownMenuBox alignmentX={boxAlignmentX}>
                <DropdownMenuTitle>
                    {traduction.language.changeLocaleLabel}
                </DropdownMenuTitle>
                <DropdownMenuLink href={`/es/${pathnameSuffix}`}>Español</DropdownMenuLink>
                <DropdownMenuLink href={`/en/${pathnameSuffix}`}>English</DropdownMenuLink>
                <DropdownMenuLink href={`/fr/${pathnameSuffix}`}>Français</DropdownMenuLink>
                <DropdownMenuLink href={`/pt/${pathnameSuffix}`}>Português</DropdownMenuLink>
                <DropdownMenuLink href={`/nl/${pathnameSuffix}`}>Nederlands</DropdownMenuLink>
            </DropdownMenuBox>
        </DropdownMenu>
    )
}