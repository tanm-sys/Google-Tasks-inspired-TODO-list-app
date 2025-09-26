"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
 * It forwards a ref to the underlying `RadioGroupPrimitive.Root` element.
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Root>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered radio group component.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

/**
 * An item in a radio group.
 * It forwards a ref to the underlying `RadioGroupPrimitive.Item` element.
 * @param {React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof RadioGroupPrimitive.Item>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered radio group item component.
 */
const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-3.5 w-3.5 fill-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
