import { Skeleton } from "@/components/ui/skeleton";

function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-28" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

const LoadingForm = () => {
  return (
    <section>
      <Skeleton className="mb-8 h-8 w-48" />

      <div className="rounded-md border p-8">
        <div className="grid gap-4 md:grid-cols-2 my-4">
          {/* product name */}
          <FormFieldSkeleton />

          {/* company */}
          <FormFieldSkeleton />

          {/* price */}
          <FormFieldSkeleton />

          {/* image */}
          <FormFieldSkeleton />
        </div>

        {/* description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        {/* featured checkbox */}
        <div className="mt-6 flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-sm" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* submit button */}
        <Skeleton className="mt-8 h-10 w-36 rounded-md" />
      </div>
    </section>
  );
};

export default LoadingForm;
