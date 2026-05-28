import { fetchAllProducts } from "@/utils/actions";
import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const products = await fetchAllProducts({ search });
  const totalProducts = products.length;
  const searchParams = search ? `&search=${search}` : "";

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-lg">
          {totalProducts} {totalProducts > 2 ? "Products" : "Product"}
        </h4>

        <div className="flex gap-x-4">
          <Button
            variant={layout === "grid" ? "default" : "ghost"}
            size="icon"
            asChild
          >
            <Link href={`?layout=grid${searchParams}`}>
              <LuLayoutGrid />
            </Link>
          </Button>
          <Button
            variant={layout === "list" ? "default" : "ghost"}
            size="icon"
            asChild
          >
            <Link href={`?layout=list${searchParams}`}>
              <LuList />
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="mt-4" />

      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
        )}
      </div>
    </>
  );
}

export default ProductsContainer;
