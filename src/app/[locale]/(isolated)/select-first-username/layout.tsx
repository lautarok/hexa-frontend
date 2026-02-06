import Image from "next/image"
import AppIcon from "@/public/images/icon.png"
import getTraduction from "@/src/shared/services/getTraduction"
import Button from "@/src/shared/ui/common/Button"
import LocaleSelector from "@/src/shared/ui/layout/LocaleSelector"
import LogoutButton from "@/src/core/ui/common/LogoutButton"

export default async function SelectFirstUsernameLayout({
    params,
    children
}: {
    params: Promise<{
        locale: string
    }>,
    children: React.ReactNode
}) {
    const locale = (await params).locale,
        traduction = getTraduction(locale)

    return (
        <div className="w-full h-fit min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto] gap-10 py-10 container-x-padding items-center justify-center">
            <header className="w-full h-fit grid gap-5 items-center grid-cols-3">
                <div className="flex items-center justify-center gap-3 col-2">
                    <Image
                        alt={traduction.header.iconAlt}
                        src={AppIcon}
                        width={26}
                        height={23}
                    />
                    <p className="text-xl font-semibold">{traduction.common.appName}</p>
                </div>
                <div className="w-fit ml-auto">
                    <LogoutButton size="sm" />
                </div>
            </header>
            <main className="w-full h-full flex items-center justify-center flex-col gap-10">
                {children}
            </main>
            <div className="w-full h-fit flex items-center justify-center">
                <nav className="w-fit h-fit grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <div className="ml-auto">
                        <LocaleSelector discrete boxAlignmentX="center" />
                    </div>
                    <div className="w-[2px] h-5 bg-white/10 rounded-full"></div>
                    <LogoutButton variant="ghost" size="md" />
                </nav>
            </div>
        </div>
    )
}