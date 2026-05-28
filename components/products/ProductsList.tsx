import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/generated/prisma/client";
import Image from "next/image";
import FavoriteToggleButton from "./FavouriteToggleButton";

function ProductsList({ products }: { products: Product[] }) {
  return (
    <div className="mt-12 grid gap-5">
      {products.map((product, index) => {
        const { name, price, image, company } = product;
        const poundsAmount = formatPrice(price);
        const productId = product.id;

        return (
          <article
            key={productId}
            className="group relative shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/products/${productId}`}>
              <Card className="overflow-hidden rounded-2xl border-border bg-card ">
                <CardContent className="grid gap-5 p-4 sm:grid-cols-[180px_1fr_auto] sm:items-center sm:p-5">
                  <div className="relative h-64 overflow-hidden rounded-xl bg-muted sm:h-44 sm:w-44">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 100vw, 180px"
                      priority={index < 3}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 pr-10 sm:pr-0">
                    <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                      {company}
                    </p>

                    <h2 className="line-clamp-2 text-xl font-semibold capitalize tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {name}
                    </h2>

                    <p className="max-w-md text-sm leading-6 text-muted-foreground">
                      Quality product selected for everyday style and comfort.
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <p className="text-xl font-bold text-foreground">
                      {poundsAmount}
                    </p>

                    <span className="rounded-full bg-muted px-4 py-2 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      View item
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute right-5 top-5 z-10">
              <FavoriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ProductsList;
