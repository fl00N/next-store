import { Skeleton } from "../ui/skeleton";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const LoadingTable = ({ rows = 7 }: { rows: number }) => {
  const tableRows = Array.from({ length: rows }, (_, i) => {
    return (
      <div className="mt-4" key={i}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
      {tableRows}
    </>
  );
};

export default LoadingTable;
