import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import { fetchSingleProduct } from "@/utils/actions";
import Image from "next/image";
import { formatPrice } from "@/utils/format";
import FavouriteToggleButton from "@/components/products/FavouriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await fetchSingleProduct(params.id);
  const { name, image, company, description, price } = product;
  const poundsPrice = formatPrice(price);

  return (
    <section>
      <BreadCrumbs name={name} />

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
          <div className="relative aspect-square min-h-[24rem]">
            <Image
              src={image}
              alt={name}
              fill
              priority
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-start justify-between gap-6">
            <div>
              <p className="mb-3 w-fit rounded-full bg-muted px-4 py-1 text-sm font-medium capitalize text-muted-foreground">
                {company}
              </p>

              <h1 className="max-w-xl text-4xl font-bold capitalize tracking-tight text-foreground sm:text-5xl">
                {name}
              </h1>
            </div>

            <div className="shrink-0 rounded-full border border-border bg-background shadow-sm">
              <FavouriteToggleButton productId={params.id} />
            </div>
          </div>

          <ProductRating />

          <div className="mt-6 flex items-center gap-4">
            <p className="rounded-full bg-primary px-5 py-2 text-lg font-bold text-primary-foreground shadow-sm">
              {poundsPrice}
            </p>

            <p className="text-sm text-muted-foreground">In stock</p>
          </div>

          <div className="my-8 h-px bg-border" />

          <div>
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Product details
            </h2>

            <p className="max-w-2xl leading-8 text-muted-foreground mb-4">
              {description}
            </p>
          </div>

          <AddToCart productId={params.id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
