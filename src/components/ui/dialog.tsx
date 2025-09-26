"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The root component for a dialog.
 */
const Dialog = DialogPrimitive.Root

/**
 * The component that triggers the dialog to open.
 */
const DialogTrigger = DialogPrimitive.Trigger

/**
 * A component to portal the dialog to a different part of the DOM.
 */
const DialogPortal = DialogPrimitive.Portal

/**
 * A component to close the dialog.
 */
const DialogClose = DialogPrimitive.Close

/**
 * A component that renders a semi-transparent overlay behind the dialog.
 * It forwards a ref to the underlying `DialogPrimitive.Overlay` element.
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DialogPrimitive.Overlay>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered dialog overlay component.
 */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

/**
 * The content of the dialog.
 * It forwards a ref to the underlying `DialogPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DialogPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered dialog content component.
 */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

/**
 * The header of the dialog.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered dialog header component.
 */
const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

/**
 * The footer of the dialog.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered dialog footer component.
 */
const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter"

/**
 * The title of the dialog.
 * It forwards a ref to the underlying `DialogPrimitive.Title` element.
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DialogPrimitive.Title>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered dialog title component.
 */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

/**
 * The description of the dialog.
 * It forwards a ref to the underlying `DialogPrimitive.Description` element.
 * @param {React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DialogPrimitive.Description>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered dialog description component.
 */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
