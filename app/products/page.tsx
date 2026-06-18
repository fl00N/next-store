import LoadingContainer from "@/components/global/LoadingContainer";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Suspense } from "react";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return (
    <div>
      <Suspense fallback={<LoadingContainer />}>
        <ProductsContainer layout={layout} search={search} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
