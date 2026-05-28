import LoadingContainer from "@/components/global/LoadingContainer";
import SectionTitle from "@/components/global/SectionTitle";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <>
      <Hero />

      <section className="pt-24">
        <SectionTitle text={"featured products"} />

        <Suspense fallback={<LoadingContainer />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </>
  );
};

export default HomePage;
