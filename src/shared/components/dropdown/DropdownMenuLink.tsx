import Link from "next/link"
import useDropdownMenu from "../../hooks/useDropdownMenu"

export default function DropdownMenuLink({
    className,
    children,
    href
}: {
    className?: string,
    children: React.ReactNode,
    href?: string
}) {
    const dropdownMenu = useDropdownMenu()
    
    return (
        <Link
            href={href || ""}
            onClick={() => {dropdownMenu.set(false)}}
            className={[
                "w-full h-full text-left rounded-2xl px-3 py-2 text-md hover:bg-white/10 rounded-md",
                className
            ].join(" ")}
        >
            {children}
        </Link>
    )
}