"use client"

import { Toaster as Sonner } from "sonner"

/**
 * The props for the Toaster component.
 */
type ToasterProps = React.ComponentProps<typeof Sonner>

/**
 * A component to display toast notifications.
 * It is a wrapper around the `sonner` library.
 * @param {ToasterProps} props - The props for the component.
 * @returns {JSX.Element} The rendered toaster component.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }