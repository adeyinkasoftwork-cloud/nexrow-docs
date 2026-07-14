import { sections } from "@/content/content";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import OnThisPage from "@/components/OnThisPage";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <Providers>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-line focus:bg-surface focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium"
      >
        Skip to content
      </a>

      <Header />

      <div className="mx-auto flex max-w-[1440px] gap-8 px-4 sm:px-6">
        <Sidebar />

        <main
          id="content"
          className="min-w-0 flex-1 lg:max-w-content lg:flex-none xl:mx-auto"
        >
          <Hero />

          {sections.map((section, i) => (
            <Section key={section.id} section={section} index={i} />
          ))}

          <Footer />
        </main>

        <OnThisPage />
      </div>
    </Providers>
  );
}
