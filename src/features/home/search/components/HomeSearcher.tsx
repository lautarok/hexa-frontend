import * as Icon from "akar-icons"

export default function HomeSearcher() {
    return (
        <div className="w-fit h-fit flex flex-col gap-2 text-left">
            <p className="font-semibold">Buscá productos y categorías</p>
            <div className="w-160 max-w-full h-14 bg-white/10 rounded-full grid items-center grid-cols-[1fr_auto] gap-3 pl-4 pr-2 border-[0.1rem] border-white/10 overflow-hidden">
                <div className="w-full h-fit grid grid-cols-[auto_auto_1fr] gap-3 items-center">
                    <Icon.Search className="size-5" />
                    <div className="w-[0.1rem] h-8 bg-white/10"></div>
                    <input type="text" autoComplete="off" placeholder="Ej: MacBook M1 Pro" />
                </div>
                <button className="w-fit h-10 flex items-center rounded-full px-4 font-semibold gap-2 bg-pink-300 shadow-lg shadow-cyan-500/30 text-black border-1 border-white/20">
                    <span>Buscar</span>
                    <Icon.ArrowRight strokeWidth={3} className="size-3.5" />
                </button>
            </div>
        </div>
    )
}