import HomeFilterButton from "./HomeFilterButton";

export default function HomeFilters() {
    return (
        <div className="w-250 max-w-full h-fit flex items-center justify-center flex-wrap gap-3">
            <HomeFilterButton prefixIcon="Bicycle">Bicicletas</HomeFilterButton>
            <HomeFilterButton prefixIcon="Air">Patinetes</HomeFilterButton>
            <HomeFilterButton prefixIcon="Fire">Motos</HomeFilterButton>
            <HomeFilterButton prefixIcon="Key">Autos</HomeFilterButton>
            <HomeFilterButton prefixIcon="Truck">Camionetas</HomeFilterButton>
            <HomeFilterButton prefixIcon="Thunder">E-Bikes</HomeFilterButton>
            <HomeFilterButton prefixIcon="RockOn">Skateboards</HomeFilterButton>
            <HomeFilterButton prefixIcon="Radio">Quads</HomeFilterButton>
            <HomeFilterButton prefixIcon="Leaf">Patines</HomeFilterButton>
            <HomeFilterButton prefixIcon="Shield">Cascos</HomeFilterButton>
            <HomeFilterButton prefixIcon="Crown">Accesorios</HomeFilterButton>
        </div>
    )
}