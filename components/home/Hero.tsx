import Link from "next/link";
import HeroCarousel from "./HeroCarousel";
import { Button } from "../ui/button";

function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div className="max-w-2xl">
        <p className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          New arrivals are here
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Shop smarter, live better
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
          Discover quality products made for your everyday lifestyle. Browse our
          latest collection and find your new favorites today.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/products">Shop Now</Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8"
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <HeroCarousel />
    </section>
  );
}

export default Hero;
