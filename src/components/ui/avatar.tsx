"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

/**
 * An image element with a fallback for representing a user.
 * It forwards a ref to the underlying `AvatarPrimitive.Root` element.
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Root>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered avatar component.
 */
const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

/**
 * The image component for the avatar.
 * It forwards a ref to the underlying `AvatarPrimitive.Image` element.
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Image>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered avatar image component.
 */
const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

/**
 * A fallback component to be rendered when the avatar image is not available.
 * It forwards a ref to the underlying `AvatarPrimitive.Fallback` element.
 * @param {React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof AvatarPrimitive.Fallback>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered avatar fallback component.
 */
const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }
