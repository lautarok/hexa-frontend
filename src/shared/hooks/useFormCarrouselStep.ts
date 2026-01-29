import { useContext } from "react";
import FormCarrouselStepContext from "../context/FormCarrouselStepContext";

export default function useFormCarrouselStep() {
    return useContext(FormCarrouselStepContext)
} 