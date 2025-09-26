"use client"

import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

/**
 * The root component for a hover card.
 */
const HoverCard = HoverCardPrimitive.Root

/**
 * The component that triggers the hover card to open.
 */
const HoverCardTrigger = HoverCardPrimitive.Trigger

/**
 * The content of a hover card.
 * It forwards a ref to the underlying `HoverCardPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof HoverCardPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered hover card content component.
 */
const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-hover-card-content-transform-origin]",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
