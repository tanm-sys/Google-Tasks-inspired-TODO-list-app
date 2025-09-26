import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A responsive table component.
 * It forwards a ref to the underlying `table` element.
 * @param {React.HTMLAttributes<HTMLTableElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table component.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

/**
 * The header of a table.
 * It forwards a ref to the underlying `thead` element.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table header component.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

/**
 * The body of a table.
 * It forwards a ref to the underlying `tbody` element.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table body component.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

/**
 * The footer of a table.
 * It forwards a ref to the underlying `tfoot` element.
 * @param {React.HTMLAttributes<HTMLTableSectionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableSectionElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table footer component.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

/**
 * A row in a table.
 * It forwards a ref to the underlying `tr` element.
 * @param {React.HTMLAttributes<HTMLTableRowElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableRowElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table row component.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

/**
 * A header cell in a table.
 * It forwards a ref to the underlying `th` element.
 * @param {React.ThHTMLAttributes<HTMLTableCellElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCellElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table head component.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

/**
 * A cell in a table.
 * It forwards a ref to the underlying `td` element.
 * @param {React.TdHTMLAttributes<HTMLTableCellElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCellElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table cell component.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

/**
 * The caption of a table.
 * It forwards a ref to the underlying `caption` element.
 * @param {React.HTMLAttributes<HTMLTableCaptionElement>} props - The props for the component.
 * @param {React.Ref<HTMLTableCaptionElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered table caption component.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
