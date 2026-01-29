"use client"

import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Avatar from "../common/Avatar"
import DropdownMenu from "../dropdown/DropdownMenu"
import DropdownMenuBox from "../dropdown/DropdownMenuBox"
import DropdownMenuButton from "../dropdown/DropdownMenuButton"
import DropdownMenuTitle from "../dropdown/DropdownMenuTitle"
import * as Icon from "akar-icons"
import DropdownMenuLink from "../dropdown/DropdownMenuLink"

export default function MyUserCard() {
    const auth = useAuth()

    const [_dropdownIsOpen, _setDropdownIsOpen] = useState(false)

    return (
        <DropdownMenu
            hideChevron
            onChange={_setDropdownIsOpen}
            label={
                <div className="w-fit h-fit p-3 pr-5 rounded-2xl bg-white/10 grid grid-cols-[auto_1fr_auto] gap-5 items-center">
                    <Avatar name={auth?.user?.name || ""} />
                    <div className="w-full h-fit gap-1 text-sm flex flex-col text-left">
                        <span className="text-md leading-[1] font-semibold">
                            {auth?.user?.name}
                            {
                                auth?.user?.name
                                && auth.user.surname
                                && auth.user.name.length + auth.user.surname.length < 26
                                    ? " " + auth.user.surname
                                    : ""
                            }</span>
                        <span className="opacity-70 leading-[1]">$ 0,00</span>
                    </div>
                    <Icon.ChevronDown
                        className={[
                            "size-4 transition-rotate duration-250",
                            _dropdownIsOpen ? "rotate-180" : ""
                        ].join(" ")}
                    />
                </div>
            }
        >
            <DropdownMenuBox outter alignmentX="right">
                <DropdownMenuTitle>
                    Mi usuario
                </DropdownMenuTitle>
                <div className="w-full min-w-fit relative h-fit flex flex-col items-end border-y-1 border-white/10 p-6 gap-4">
                    <Avatar
                        name={auth?.user?.name || ""}
                        size="xl"
                    />
                    <div className="flex w-fit flex-col text-right text-sm items-end gap-2">
                        <span className="text-md font-semibold leading-[1] whitespace-nowrap">{auth?.user?.name} {auth?.user?.surname}</span>
                        <span className="font-semibold leading-[1]">@{auth?.user?.credential?.username}</span>
                    </div>
                </div>
                <DropdownMenuLink
                    href="#"
                    suffixIcon="Person"
                >
                    Ver mi perfil
                </DropdownMenuLink>
                <DropdownMenuLink
                    href="#"
                    suffixIcon="CreditCardAlt1"
                >
                    Mi billetera
                </DropdownMenuLink>
                <DropdownMenuButton
                    onClick={auth?.clear}
                    suffixIcon="Door"
                >
                    Cerrar sesión
                </DropdownMenuButton>
            </DropdownMenuBox>
        </DropdownMenu>
    )
}