import { cn } from "@/lib/utils";

type CollectionContentProps = React.ComponentProps<"section"> & {
  children?: React.ReactNode;
};

export default function CollectionContent({
  className,
  children,
  ...props
}: CollectionContentProps) {
  return (
    <section
      className={cn(
        "grid gap-4 overflow-y-auto px-container pb-12 pt-2",
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
