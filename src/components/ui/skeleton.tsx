import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
<<<<<<< HEAD
      className={cn("animate-pulse rounded-md bg-muted", className)}
=======
      className={cn("bg-accent animate-pulse rounded-md", className)}
>>>>>>> origin/main
      {...props}
    />
  );
}

export { Skeleton };
