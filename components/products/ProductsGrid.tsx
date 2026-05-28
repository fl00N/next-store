import { Product } from "@/lib/generated/prisma/client";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import FavouriteToggleButton from "./FavouriteToggleButton";

const ProductsGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => {
        const { name, price, image } = product;
        const productId = product.id;
        const poundsAmount = formatPrice(price);

        return (
          <article
            key={productId}
            className="group relative transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href={`/products/${productId}`}>
              <Card className="overflow-hidden rounded-2xl border-border bg-card shadow-sm">
                <CardContent className="p-3">
                  <div className="relative h-64 overflow-hidden rounded-xl bg-muted md:h-56">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 3}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-2 px-1 py-4">
                    <h2 className="line-clamp-1 text-base font-semibold capitalize tracking-tight text-foreground">
                      {name}
                    </h2>

                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-bold text-foreground">
                        {poundsAmount}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <div className="absolute right-5 top-5 z-10">
              <FavouriteToggleButton productId={productId} />
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
