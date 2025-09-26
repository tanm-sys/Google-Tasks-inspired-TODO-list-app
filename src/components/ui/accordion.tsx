"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A vertically stacked set of interactive headings that each reveal a section of content.
 * This component is a wrapper around the `AccordionPrimitive.Root` component.
 */
const Accordion = AccordionPrimitive.Root

/**
 * A component that wraps an accordion trigger and content.
 * It forwards a ref to the underlying `AccordionPrimitive.Item` element.
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Item>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered accordion item.
 */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

/**
 * A component that serves as a button to open and close an accordion item.
 * It forwards a ref to the underlying `AccordionPrimitive.Trigger` element.
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Trigger>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered accordion trigger.
 */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

/**
 * A component that contains the content to be displayed when an accordion item is open.
 * It forwards a ref to the underlying `AccordionPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AccordionPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered accordion content.
 */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
