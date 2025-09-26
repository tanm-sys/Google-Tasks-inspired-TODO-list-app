"use client"

import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * The root component for a context menu.
 */
const ContextMenu = ContextMenuPrimitive.Root

/**
 * The component that triggers the context menu.
 */
const ContextMenuTrigger = ContextMenuPrimitive.Trigger

/**
 * A component to group context menu items.
 */
const ContextMenuGroup = ContextMenuPrimitive.Group

/**
 * A component to portal the context menu to a different part of the DOM.
 */
const ContextMenuPortal = ContextMenuPrimitive.Portal

/**
 * A component to create a sub-menu within a context menu.
 */
const ContextMenuSub = ContextMenuPrimitive.Sub

/**
 * A component to create a radio group within a context menu.
 */
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

/**
 * A component that triggers a sub-menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.SubTrigger` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the trigger should be inset.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu sub-trigger component.
 */
const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

/**
 * The content of a sub-menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.SubContent` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.SubContent>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu sub-content component.
 */
const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

/**
 * The content of a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu content component.
 */
const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 max-h-[--radix-context-menu-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-context-menu-content-transform-origin]",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

/**
 * An item in a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.Item` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the item should be inset.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Item>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu item component.
 */
const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

/**
 * A checkbox item in a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.CheckboxItem` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu checkbox item component.
 */
const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

/**
 * A radio item in a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.RadioItem` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.RadioItem>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu radio item component.
 */
const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

/**
 * A label in a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.Label` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the label should be inset.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Label>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu label component.
 */
const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

/**
 * A separator in a context menu.
 * It forwards a ref to the underlying `ContextMenuPrimitive.Separator` element.
 * @param {React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof ContextMenuPrimitive.Separator>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered context menu separator component.
 */
const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

/**
 * A component to display a keyboard shortcut in a context menu.
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered context menu shortcut component.
 */
const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}
