import useDropdownMenu from "../../hooks/useDropdownMenu"
import IconButton from "../common/IconButton"

export default function DropdownMenuTitle({
    children
}: {
    children: string
}) {
    const dropdownMenu = useDropdownMenu()

    return (
        <div className="w-full h-fit flex items-center gap-2">
            <p className="text-sm font-semibold block inline min-w-fit whitespace-nowrap m-3">
                {children}
            </p>
            <IconButton
                label="Close menu"
                icon="Cross"
                onClick={() => dropdownMenu.set(false)}
            />
        </div>
    )
}