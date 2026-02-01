import Link from "next/link"
import useDropdownMenu from "../../hooks/useDropdownMenu"
import * as Icon from "akar-icons"

export default function DropdownMenuLink({
    className,
    children,
    suffixIcon,
    href
}: {
    className?: string,
    children: string,
    suffixIcon?: keyof typeof Icon,
    href?: string
}) {
    const SuffixIcon = suffixIcon ? Icon[suffixIcon] : undefined

    const dropdownMenu = useDropdownMenu()
    
    return (
        <Link
            href={href || ""}
            onClick={() => {dropdownMenu.set(false)}}
            className={[
                "w-full h-full text-left rounded-xl px-3 py-2 text-md hover:bg-white/10 flex items-center gap-3 transition-colors",
                className
            ].join(" ")}
        >
            {
                SuffixIcon && (
                    <SuffixIcon className="size-4" />
                )
            }
            <span className="whitespace-nowrap">{children}</span>
        </Link>
    )
}