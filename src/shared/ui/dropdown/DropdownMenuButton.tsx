import useDropdownMenu from "../../hooks/useDropdownMenu"
import * as Icon from "akar-icons"

export default function DropdownMenuButton({
    className,
    suffixIcon,
    children,
    onClick
}: {
    className?: string,
    suffixIcon?: keyof typeof Icon,
    children: string,
    onClick?: () => void
}) {
    const SuffixIcon = suffixIcon ? Icon[suffixIcon] : undefined

    const dropdownMenu = useDropdownMenu()

    const handleClick = () => {
        dropdownMenu.set(false)
        onClick?.()
    }
    
    return (
        <button
            onClick={handleClick}
            className={[
                "w-full h-full text-left rounded-xl px-3 py-2 text-md hover:bg-white/10 flex items-center gap-3 transition-colors",
                className
            ].join(" ")}
        >
            {
                SuffixIcon ? (
                    <SuffixIcon className="size-4" />
                ) : null
            }
            <span className="whitespace-nowrap">{children}</span>
        </button>
    )
}