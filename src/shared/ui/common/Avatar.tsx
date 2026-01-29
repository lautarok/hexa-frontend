export default function Avatar({
    name,
    size = "md"
}: {
    name: string,
    size?: "md" | "xl"
}) {
    return (
        <div
            className={[
                "bg-white text-black font-semibold flex items-center justify-center",
                size === "md" ? "rounded-xl w-10 h-10 text-xl" : "rounded-2xl w-16 h-16 text-2xl"
            ].join(" ")}
        >
            <span>{name.slice(0, 2)}</span>
        </div>
    )
}