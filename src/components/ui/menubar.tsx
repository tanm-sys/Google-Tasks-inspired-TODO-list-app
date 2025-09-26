"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A menu in a menubar.
 * @param {React.ComponentProps<typeof MenubarPrimitive.Menu>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar menu component.
 */
function MenubarMenu({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Menu>) {
  return <MenubarPrimitive.Menu {...props} />
}

/**
 * A group of items in a menubar.
 * @param {React.ComponentProps<typeof MenubarPrimitive.Group>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar group component.
 */
function MenubarGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Group>) {
  return <MenubarPrimitive.Group {...props} />
}

/**
 * A portal for a menubar.
 * @param {React.ComponentProps<typeof MenubarPrimitive.Portal>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar portal component.
 */
function MenubarPortal({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Portal>) {
  return <MenubarPrimitive.Portal {...props} />
}

/**
 * A radio group in a menubar.
 * @param {React.ComponentProps<typeof MenubarPrimitive.RadioGroup>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar radio group component.
 */
function MenubarRadioGroup({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.RadioGroup>) {
  return <MenubarPrimitive.RadioGroup {...props} />
}

/**
 * A sub-menu in a menubar.
 * @param {React.ComponentProps<typeof MenubarPrimitive.Sub>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar sub-menu component.
 */
function MenubarSub({
  ...props
}: React.ComponentProps<typeof MenubarPrimitive.Sub>) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

/**
 * A container for a set of commands that are persistently visible to the user.
 * It forwards a ref to the underlying `MenubarPrimitive.Root` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Root>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar component.
 */
const Menubar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  />
))
Menubar.displayName = MenubarPrimitive.Root.displayName

/**
 * A trigger that opens the menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.Trigger` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Trigger>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar trigger component.
 */
const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      className
    )}
    {...props}
  />
))
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName

/**
 * A trigger that opens a sub-menu.
 * It forwards a ref to the underlying `MenubarPrimitive.SubTrigger` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the trigger should be inset.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.SubTrigger>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar sub-trigger component.
 */
const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
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
  </MenubarPrimitive.SubTrigger>
))
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName

/**
 * The content of a sub-menu.
 * It forwards a ref to the underlying `MenubarPrimitive.SubContent` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.SubContent>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar sub-content component.
 */
const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
      className
    )}
    {...props}
  />
))
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName

/**
 * The content of a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.Content` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Content>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar content component.
 */
const MenubarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-menubar-content-transform-origin]",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
)
MenubarContent.displayName = MenubarPrimitive.Content.displayName

/**
 * An item in a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.Item` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the item should be inset.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Item>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar item component.
 */
const MenubarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarItem.displayName = MenubarPrimitive.Item.displayName

/**
 * A checkbox item in a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.CheckboxItem` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.CheckboxItem>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar checkbox item component.
 */
const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <MenubarPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName

/**
 * A radio item in a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.RadioItem` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.RadioItem>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar radio item component.
 */
const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Circle className="h-4 w-4 fill-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
))
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName

/**
 * A label in a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.Label` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & { inset?: boolean }} props - The props for the component.
 * @param {boolean} [props.inset] - Whether the label should be inset.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Label>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar label component.
 */
const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
MenubarLabel.displayName = MenubarPrimitive.Label.displayName

/**
 * A separator in a menubar.
 * It forwards a ref to the underlying `MenubarPrimitive.Separator` element.
 * @param {React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof MenubarPrimitive.Separator>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered menubar separator component.
 */
const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName

/**
 * A component to display a keyboard shortcut in a menubar.
 * @param {React.HTMLAttributes<HTMLSpanElement>} props - The props for the component.
 * @returns {JSX.Element} The rendered menubar shortcut component.
 */
const MenubarShortcut = ({
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
MenubarShortcut.displayname = "MenubarShortcut"

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
}
