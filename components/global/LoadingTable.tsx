import { Skeleton } from "../ui/skeleton";

const LoadingTable = ({ rows = 7 }: { rows?: number }) => {
  const tableRows = Array.from({ length: rows }, (_, i) => {
    return (
      <div className="mt-4" key={i}>
        <Skeleton className="w-full h-8 rounded" />
      </div>
    );
  });

  return [tableRows];
};

export default LoadingTable;
