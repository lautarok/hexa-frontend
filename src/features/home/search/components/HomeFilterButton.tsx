import * as Icon from "akar-icons"

export default function HomeFilterButton({
    children,
    prefixIcon
}: {
    children?: string,
    prefixIcon?: keyof typeof Icon
}) {
    const PrefixIcon = prefixIcon ? Icon[prefixIcon] : null

    return (
        <button className="w-fit h-fit px-3 py-2 rounded-full flex items-center gap-2 bg-white/10 hover:bg-white/20">
            {
                PrefixIcon && (
                    <PrefixIcon className="size-4" />
                )
            }
            <span className="text-sm">{children}</span>
        </button>
    )
}