import HomeSearcher from "@/src/features/home/search/components/HomeSearcher";
import HomeWelcome from "@/src/features/home/hero/components/HomeWelcome";
import HomeAuthorizationMessage from "@/src/features/home/hero/components/HomeAuthorizationMessage";
import HomeFilters from "@/src/features/home/search/components/HomeFilters";

export default async function Home() {
  return (
    <>
      <section className="w-full h-fit text-center">
        <article className="w-full h-fit flex flex-col">
          <HomeAuthorizationMessage />
          <HomeWelcome />
        </article>
      </section>
      <section className="w-full h-fit">
        <nav className="w-full h-fit flex flex-col gap-10 py-10 container-x-padding justify-center items-center">
          <HomeSearcher />
          <HomeFilters />
        </nav>
      </section>
    </>
  )
}
