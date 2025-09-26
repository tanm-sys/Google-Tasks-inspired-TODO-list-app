"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

/**
 * A modal dialog that interrupts the user with important content and expects a response.
 * This component is a wrapper around the `AlertDialogPrimitive.Root` component.
 */
const AlertDialog = AlertDialogPrimitive.Root

/**
 * A button that opens the alert dialog.
 * This component is a wrapper around the `AlertDialogPrimitive.Trigger` component.
 */
const AlertDialogTrigger = AlertDialogPrimitive.Trigger

/**
 * A component that portals the alert dialog to a different part of the DOM.
 * This component is a wrapper around the `AlertDialogPrimitive.Portal` component.
 */
const AlertDialogPortal = AlertDialogPrimitive.Portal

/**
 * A component that renders a semi-transparent overlay behind the alert dialog.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Overlay` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Overlay>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog overlay.
 */
const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

/**
 * A component that contains the content of the alert dialog.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog content.
 */
const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

/**
 * A component that contains the header of the alert dialog.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered alert dialog header.
 */
const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

/**
 * A component that contains the footer of the alert dialog.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered alert dialog footer.
 */
const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

/**
 * A component that displays the title of the alert dialog.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Title` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Title>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog title.
 */
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

/**
 * A component that displays the description of the alert dialog.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Description` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Description>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog description.
 */
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

/**
 * A button that performs the primary action of the alert dialog.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Action` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Action>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog action button.
 */
const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    ref={ref}
    className={cn(buttonVariants(), className)}
    {...props}
  />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

/**
 * A button that cancels the action of the alert dialog and closes it.
 * It forwards a ref to the underlying `AlertDialogPrimitive.Cancel` element.
 * @param {React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AlertDialogPrimitive.Cancel>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert dialog cancel button.
 */
const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
