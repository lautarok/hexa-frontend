import { useContext } from "react"
import FormCarrouselContext from "../context/FormCarrouselContext"

export default function useFormCarrousel() {
    return useContext(FormCarrouselContext)
}