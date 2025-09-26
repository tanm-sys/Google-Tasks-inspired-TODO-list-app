"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/**
 * The root component for a popover.
 */
const Popover = PopoverPrimitive.Root

/**
 * The component that triggers the popover to open.
 */
const PopoverTrigger = PopoverPrimitive.Trigger

/**
 * A component to which the popover content can be anchored.
 */
const PopoverAnchor = PopoverPrimitive.Anchor

/**
 * The content of a popover.
 * It forwards a ref to the underlying `PopoverPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof PopoverPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered popover content component.
 */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
