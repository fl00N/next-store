import ProductsContainer from "@/components/products/ProductsContainer";

const ProductsPage = ({
  searchParams,
}: {
  searchParams: { layout?: string; search?: string };
}) => {
  const layout = searchParams.layout || "grid";
  const search = searchParams.search || "";

  return (
    <div>
      <ProductsContainer layout={layout} search={search} />
    </div>
  );
};

export default ProductsPage;
