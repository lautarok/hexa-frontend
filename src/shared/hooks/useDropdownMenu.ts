import { useContext } from "react";
import DropdownMenuContext from "../context/DropdownMenuContext";

export default function useDropdownMenu() {
    return useContext(DropdownMenuContext)
}