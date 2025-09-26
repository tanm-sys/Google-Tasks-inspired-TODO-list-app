"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/**
 * A component to display the progress of a task.
 * It forwards a ref to the underlying `ProgressPrimitive.Root` element.
 * @param {React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>} props - The props for the component.
 * @param {number | null | undefined} props.value - The current value of the progress bar.
 * @param {React.Ref<React.ElementRef<typeof ProgressPrimitive.Root>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered progress component.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
