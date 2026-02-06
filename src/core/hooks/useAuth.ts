import AuthContext from "@/src/core/context/authContext";
import { useContext } from "react";

export default function useAuth() {
    return useContext(AuthContext)
}