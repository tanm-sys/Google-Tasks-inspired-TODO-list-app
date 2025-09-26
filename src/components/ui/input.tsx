import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A styled input component.
 * It forwards a ref to the underlying `input` element.
 * @param {React.ComponentProps<"input">} props - The props for the component.
 * @param {React.Ref<HTMLInputElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered input component.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
