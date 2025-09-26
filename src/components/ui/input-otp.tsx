"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Minus } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A component for one-time password (OTP) input.
 * It forwards a ref to the underlying `OTPInput` element.
 * @param {React.ComponentPropsWithoutRef<typeof OTPInput>} props - The props for the component.
 * @param {React.Ref<React.ElementRef<typeof OTPInput>>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered OTP input component.
 */
const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

/**
 * A component to group OTP input slots.
 * It forwards a ref to the underlying `div` element.
 * @param {React.ComponentPropsWithoutRef<"div">} props - The props for the component.
 * @param {React.Ref<React.ElementRef<"div">>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered OTP input group component.
 */
const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

/**
 * A component that represents a single slot in the OTP input.
 * It forwards a ref to the underlying `div` element.
 * @param {React.ComponentPropsWithoutRef<"div"> & { index: number }} props - The props for the component.
 * @param {number} props.index - The index of the slot.
 * @param {React.Ref<React.ElementRef<"div">>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered OTP input slot component.
 */
const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

/**
 * A component to render a separator between OTP input slots.
 * It forwards a ref to the underlying `div` element.
 * @param {React.ComponentPropsWithoutRef<"div">} props - The props for the component.
 * @param {React.Ref<React.ElementRef<"div">>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered OTP input separator component.
 */
const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Minus />
  </div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
