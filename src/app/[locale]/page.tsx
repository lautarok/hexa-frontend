import Footer from "@/src/shared/ui/layout/Footer";
import Header from "@/src/shared/ui/layout/Header";
import getTraduction from "@/src/shared/services/getTraduction";
import HomeSearcher from "@/src/features/home/search/components/HomeSearcher";
import Button from "@/src/shared/ui/common/Button";
import HomeWelcome from "@/src/features/home/hero/components/HomeWelcome";
import HomeAuthorizationMessage from "@/src/features/home/hero/components/HomeAuthorizationMessage";
import HomeFilters from "@/src/features/home/search/components/HomeFilters";

export default async function Home({
  params
}: {
  params: Promise<{
    locale: string
  }>
}) {
  const locale = (await params).locale,
    traduction = getTraduction(locale)

  return (
    <>
      <Header traduction={traduction} locale={locale} />
      <main>
        <section className="w-full h-fit min-h-screen pb-15 pt-24 flex items-center text-center flex-col gap-10">
          <div className="w-full h-fit flex flex-col">
            <HomeAuthorizationMessage />
            <HomeWelcome />
          </div>
          <nav className="w-full h-fit flex flex-col gap-10 py-10 container-x-padding justify-center items-center">
            <HomeSearcher />
            <HomeFilters />
          </nav>
        </section>
      </main>
      <Footer traduction={traduction} locale={locale} />
    </>
  )
}
