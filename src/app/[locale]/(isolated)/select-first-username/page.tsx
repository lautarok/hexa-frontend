"use client"

import useAuth from "@/src/core/hooks/useAuth"
import SelectFirstUsernameForm from "@/src/features/select-first-username/components/SelectFirstUsernameForm"

export default function SelectUsernamePage() {
    const auth = useAuth()

    return auth?.user ? (
        <article className="w-full h-fit container-x-padding flex items-center justify-center">
            <div className="w-100 max-w-full h-fit p-10 rounded-2xl border-1 border-white/10 flex flex-col gap-7">
                <h1 className="text-md font-bold">Hola, <span className="bg-yellow-200 text-black px-1 ml-1 rounded-md">{auth.user.name}</span></h1>
                <h2 className="text-xl font-bold">Crea tu nombre de usuario</h2>
                <SelectFirstUsernameForm />
            </div>
        </article>
    ) : null
}