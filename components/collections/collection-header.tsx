import { cn } from "@/lib/utils";

type CollectionHeaderProps = React.ComponentProps<"header"> & {
  title: string;
  count?: string | number;
  badge?: string | number;
  children?: React.ReactNode;
};
export default function CollectionHeader({
  title,
  count,
  badge,

  className,
  children,
  ...props
}: CollectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-start justify-between gap-4 px-container py-4",
        className,
      )}
      {...props}
    >
      <div className="flex flex-wrap gap-x-2 text-lg font-medium">
        <h1>{title}</h1>

        {count && <span className="text-muted-foreground">{count}</span>}
        {badge && <span>{badge}</span>}
      </div>
      {children}
    </header>
  );
}
