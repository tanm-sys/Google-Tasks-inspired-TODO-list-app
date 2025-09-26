import { cn } from "@/lib/utils"

/**
 * A component to display a skeleton loader.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered skeleton component.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
