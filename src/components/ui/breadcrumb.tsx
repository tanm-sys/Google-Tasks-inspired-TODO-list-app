import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A navigation aid that helps users keep track of their location within a program or document.
 * It forwards a ref to the underlying `nav` element.
 * @param {React.ComponentPropsWithoutRef<"nav"> & { separator?: React.ReactNode }} props - The props for the component.
 * @param {React.ReactNode} [props.separator] - The separator to be used between breadcrumb items.
 * @param {React.Ref<HTMLElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered breadcrumb component.
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

/**
 * A list of breadcrumb items.
 * It forwards a ref to the underlying `ol` element.
 * @param {React.ComponentPropsWithoutRef<"ol">} props - The props for the component.
 * @param {React.Ref<HTMLOListElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered breadcrumb list component.
 */
const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

/**
 * An individual item in a breadcrumb list.
 * It forwards a ref to the underlying `li` element.
 * @param {React.ComponentPropsWithoutRef<"li">} props - The props for the component.
 * @param {React.Ref<HTMLLIElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered breadcrumb item component.
 */
const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

/**
 * A link in a breadcrumb item.
 * It forwards a ref to the underlying `a` or `Slot` element.
 * @param {React.ComponentPropsWithoutRef<"a"> & { asChild?: boolean }} props - The props for the component.
 * @param {boolean} [props.asChild] - Whether to render the component as a `Slot`.
 * @param {React.Ref<HTMLAnchorElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered breadcrumb link component.
 */
const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

/**
 * The current page in a breadcrumb list.
 * It forwards a ref to the underlying `span` element.
 * @param {React.ComponentPropsWithoutRef<"span">} props - The props for the component.
 * @param {React.Ref<HTMLSpanElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered breadcrumb page component.
 */
const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

/**
 * A separator between breadcrumb items.
 * @param {React.ComponentProps<"li">} props - The props for the component.
 * @returns {JSX.Element} The rendered breadcrumb separator component.
 */
const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

/**
 * An ellipsis in a breadcrumb list, used to indicate that there are more items.
 * @param {React.ComponentProps<"span">} props - The props for the component.
 * @returns {JSX.Element} The rendered breadcrumb ellipsis component.
 */
const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
