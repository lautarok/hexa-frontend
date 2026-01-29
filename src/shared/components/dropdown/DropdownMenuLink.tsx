import Link from "next/link"
import useModalDialog from "../../hooks/useModalDialog"

export default function DropdownMenuLink({
    className,
    children,
    href
}: {
    className?: string,
    children: React.ReactNode,
    href?: string
}) {
    const modalDialog = useModalDialog()
    
    return (
        <Link
            href={href || ""}
            onClick={() => {modalDialog.close()}}
            className={[
                "w-full h-full text-left rounded-2xl px-3 py-2 text-md hover:bg-white/10 rounded-md",
                className
            ].join(" ")}
        >
            {children}
        </Link>
    )
}