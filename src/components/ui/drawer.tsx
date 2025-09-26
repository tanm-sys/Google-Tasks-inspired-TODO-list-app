"use client"

import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"

import { cn } from "@/lib/utils"

/**
 * A drawer component that slides in from the bottom of the screen.
 * It is built on top of the `vaul` library.
 * @param {React.ComponentProps<typeof DrawerPrimitive.Root>} props - The props for the component.
 * @param {boolean} [props.shouldScaleBackground=true] - Whether the background should be scaled when the drawer is open.
 * @returns {JSX.Element} The rendered drawer component.
 */
const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

/**
 * The component that triggers the drawer to open.
 */
const DrawerTrigger = DrawerPrimitive.Trigger

/**
 * A component to portal the drawer to a different part of the DOM.
 */
const DrawerPortal = DrawerPrimitive.Portal

/**
 * A component to close the drawer.
 */
const DrawerClose = DrawerPrimitive.Close

/**
 * A component that renders a semi-transparent overlay behind the drawer.
 * It forwards a ref to the underlying `DrawerPrimitive.Overlay` element.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DrawerPrimitive.Overlay>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered drawer overlay component.
 */
const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

/**
 * The content of the drawer.
 * It forwards a ref to the underlying `DrawerPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DrawerPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered drawer content component.
 */
const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

/**
 * The header of the drawer.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered drawer header component.
 */
const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

/**
 * The footer of the drawer.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered drawer footer component.
 */
const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

/**
 * The title of the drawer.
 * It forwards a ref to the underlying `DrawerPrimitive.Title` element.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DrawerPrimitive.Title>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered drawer title component.
 */
const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

/**
 * The description of the drawer.
 * It forwards a ref to the underlying `DrawerPrimitive.Description` element.
 * @param {React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof DrawerPrimitive.Description>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered drawer description component.
 */
const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
