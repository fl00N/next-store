import LoadingTable from "@/components/global/LoadingTable";
import SectionTitle from "@/components/global/SectionTitle";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const loading = () => {
  return (
    <>
      <SectionTitle text="Your Orders" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      <LoadingTable />
    </>
  );
};

export default loading;
