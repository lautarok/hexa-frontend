import { createContext } from "react";

const DropdownMenuContext = createContext<{
    isOpen: boolean
    set: (to: boolean) => void
    toggle: () => void
}>({
    isOpen: false,
    set: () => {},
    toggle: () => {}
})

export default DropdownMenuContext