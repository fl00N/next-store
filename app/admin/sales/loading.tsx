import LoadingTable from "@/components/global/LoadingTable";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const loading = () => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
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
