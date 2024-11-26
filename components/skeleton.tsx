import { Skeleton } from "./ui/skeleton";

export default function DefaultSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-48" />
    </div>
  );
}

export function AppSkeleton() {
  return (
    <div className="px-container">
      <div className="flex h-12 items-center gap-4">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="mb-4 flex h-12 items-center justify-between gap-4">
        <Skeleton className="h-5 w-52" />
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}
