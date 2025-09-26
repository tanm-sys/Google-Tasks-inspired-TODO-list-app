import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Defines the variants for the button component.
 * This includes variants for style (`default`, `destructive`, `outline`, `secondary`, `ghost`, `link`)
 * and size (`default`, `sm`, `lg`, `icon`).
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * The props for the Button component.
 * It extends the standard HTML attributes for a button element, the button variants,
 * and adds an `asChild` prop for polymorphism.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Whether to render the component as a `Slot`, which will merge its props onto the immediate child.
   * @default false
   */
  asChild?: boolean
}

/**
 * A clickable button component with different variants and sizes.
 * It forwards a ref to the underlying `button` or `Slot` element.
 * @param {ButtonProps} props - The props for the component.
 * @param {string} [props.className] - The class name for the component.
 * @param {('default'|'destructive'|'outline'|'secondary'|'ghost'|'link')} [props.variant] - The style variant of the button.
 * @param {('default'|'sm'|'lg'|'icon')} [props.size] - The size variant of the button.
 * @param {boolean} [props.asChild=false] - Whether to render the component as a `Slot`.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered button component.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
