import getTraduction from "@/src/shared/services/getTraduction";
import Image from "next/image";
import AppIcon from "@/public/images/icon.png"
import IconButton from "@/src/shared/ui/common/IconButton";
import LocaleSelector from "@/src/shared/ui/layout/LocaleSelector";
import Link from "next/link";
import * as Icon from "akar-icons"
import ActionButton from "@/src/ui/auth/layout/components/ActionButton";

export default async function AuthLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: Promise<{
        locale: string
    }>
}) {
    const locale = (await params).locale,
        traduction = getTraduction(locale)

    return (
        <div className="min-h-screen grid grid-cols-1 grid-rows-[6rem_1fr_6rem]">
            <div className="w-full h-fit container-x-padding my-auto grid grid-cols-[1fr_1fr_1fr] items-center gap-10">
                <Link href={`/${locale}/`} className="w-fit h-fit flex items-center gap-1">
                    <IconButton
                        icon="ArrowLeft"
                        strokeWidth={3}
                        className="-translate-x-2"
                    />
                    <span className="text-sm font-semibold">Volver al inicio</span>
                </Link>
                <Link href={`/${locale}/`} className="w-full h-full flex items-center justify-center gap-3">
                    <Image
                        alt={traduction.header.iconAlt}
                        src={AppIcon}
                        width={26}
                        height={23}
                    />
                    <p className="text-xl font-semibold">{traduction.common.appName}</p>
                </Link>
                <div className="w-fit ml-auto">
                    <ActionButton />
                </div>
            </div>
            <main className="h-full flex flex-col gap-10 items-center justify-center">
                {children}
                <nav className="w-fit h-fit flex flex-col gap-3">
                    <div className="w-full h-fit flex justify-center items-center text-xs font-semibold relative">
                        <div className="absolute top-[50%] w-full h-[1px] -translate-y-[50%] bg-white/10"></div>
                        <span className="bg-[var(--background)] px-2 block z-9 relative">O</span>
                    </div>
                    <button className="w-fit h-fit grid grid-cols-[auto_1fr] gap-2 rounded-full text-black text-md font-semibold flex items-center p-2 pr-4 hover:scale-102 duration-200 active:scale-98 transition-scale origin-center" style={{
                        background: "linear-gradient(45deg, #ffd54f, #f48fb1, #80deea)"
                    }}>
                        <Icon.GoogleFill className="size-6" />
                        <span>Ingresar con Google</span>
                    </button>
                </nav>
            </main>
            <aside className="w-fit h-fit m-auto">
                <LocaleSelector boxAlignmentX="center" traduction={traduction} />
            </aside>
        </div>
    )
}