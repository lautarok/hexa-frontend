import Image from "next/image";
import getTraduction from "../../services/getTraduction";
import SpecialIcon from "@/public/images/icon.png"
import Link from "next/link";
import LocaleSelector from "../locale/LocaleSelector";

export default async function Footer({
    traduction,
    locale
}: {
    traduction: ReturnType<typeof getTraduction>,
    locale: string
}) {
    return (
        <footer className="w-full h-fit container-x-padding py-10 bg-black">
            <div className="w-fit relative max-w-full grid grid-cols-[218px_auto] gap-10 mx-auto">
                <Image
                    alt={traduction.header.iconAlt}
                    src={SpecialIcon}
                    width={218}
                    height={200}
                    className="absolute -top-20 left-0"
                />
                <span></span>
                <nav className="w-fit grid grid-cols-[auto_auto] gap-10 font-semibold text-md">
                    <ul className="w-fit h-fit flex flex-col gap-1">
                        <li className="mb-2">
                            <p className="text-sm">{traduction.footer.platform}</p>
                        </li>
                        <li>
                            <LocaleSelector discrete boxAlignmentX="center" traduction={traduction} />
                        </li>
                        <li>
                            <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">{traduction.faqs.name}</Link>
                        </li>
                        <li>
                            <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">Instagram</Link>
                        </li>
                        <li>
                            <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">Facebook</Link>
                        </li>
                        <li>
                            <Link href="#" className="opacity-75 hover:opacity-100 transition-opacity">YouTube</Link>
                        </li>
                    </ul>
                    <ul className="w-fit h-fit flex flex-col gap-1">
                        <li className="mb-2">
                            <p className="text-sm">{traduction.footer.user}</p>
                        </li>
                        <li>
                            <Link href={`/${locale}/auth/login`} className="opacity-75 hover:opacity-100 transition-opacity">{traduction.auth.login}</Link>
                        </li>
                        <li>
                            <Link href={`/${locale}/auth/signup`} className="opacity-75 hover:opacity-100 transition-opacity">{traduction.auth.signup}</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}