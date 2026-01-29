import { createContext } from "react";

const DropdownMenuContext = createContext({
    isOpen: false,
    set: (to: boolean) => {},
    toggle: () => {}
})

export default DropdownMenuContext