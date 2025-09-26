import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Defines the variants for the alert component.
 * This includes a `default` and a `destructive` variant.
 */
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * A component that displays a short, important message in a way that attracts the user's attention without interrupting their task.
 * It forwards a ref to the underlying `div` element.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - The class name for the component.
 * @param {'default' | 'destructive'} [props.variant] - The variant of the alert.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert component.
 */
const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

/**
 * A component that displays the title of the alert.
 * It forwards a ref to the underlying `h5` element.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - The class name for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert title component.
 */
const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/**
 * A component that displays the description of the alert.
 * It forwards a ref to the underlying `div` element.
 * @param {object} props - The props for the component.
 * @param {string} [props.className] - The class name for the component.
 * @param {React.Ref<HTMLParagraphElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered alert description component.
 */
const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
