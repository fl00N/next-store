import { Skeleton } from "../ui/skeleton";

function LoadingProduct() {
  return (
    <section>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
          <Skeleton className="aspect-square min-h-[24rem] w-full rounded-none" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-start justify-between gap-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-12 w-96 max-w-full" />
              <Skeleton className="h-4 w-64 max-w-full" />
            </div>

            <Skeleton className="h-8 w-8 shrink-0 rounded" />
          </div>

          <div className="mt-6 flex items-center gap-4">
            <Skeleton className="h-11 w-28 rounded-full" />
            <Skeleton className="h-4 w-16" />
          </div>

          <Skeleton className="my-8 h-px w-full" />

          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <Skeleton className="h-4 w-8/12" />
            </div>
          </div>

          <Skeleton className="h-11 w-full rounded-md mt-10" />
        </div>
      </div>
    </section>
  );
}

export default LoadingProduct;
