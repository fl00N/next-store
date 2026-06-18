import EmptyList from "@/components/global/EmptyList";
import { fetchAdminProducts } from "@/utils/actions";
import Link from "next/link";
import { formatPrice } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductCreatedToast } from "@/components/global/ProductToast";
import { IconButton } from "@/components/form/Buttons";
import DeleteProduct from "@/components/global/DeleteProduct";
import { Suspense } from "react";
import LoadingTable from "@/components/global/LoadingTable";

type AdminProductsPageProps = {
  searchParams: { create?: string };
};

const AdminProductsPage = async ({ searchParams }: AdminProductsPageProps) => {
  const showToast = searchParams.create === "success";

  const items = await fetchAdminProducts();
  if (items.length === 0) {
    return (
      <>
        <ProductCreatedToast showToast={showToast} />
        <EmptyList />
      </>
    );
  }

  return (
    <>
      <ProductCreatedToast showToast={showToast} />

      <section>
        <Table>
          <TableCaption className="capitalize">
            total products : {items.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const { id: productId, name, company, price } = item;
              return (
                <TableRow key={productId}>
                  <TableCell>
                    <Link
                      href={`/products/${productId}`}
                      className="underline text-muted-foreground tracking-wide capitalize"
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{company}</TableCell>
                  <TableCell>{formatPrice(price)}</TableCell>

                  <TableCell className="flex items-center gap-x-2">
                    <Link href={`/admin/products/${productId}/edit`}>
                      <IconButton actionType="edit"></IconButton>
                    </Link>
                    <DeleteProduct productId={productId} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default function AdminDashboardProductsPage({
  searchParams,
}: AdminProductsPageProps) {
  return (
    <Suspense fallback={<LoadingTable rows={7} />}>
      <AdminProductsPage searchParams={searchParams} />
    </Suspense>
  );
}
