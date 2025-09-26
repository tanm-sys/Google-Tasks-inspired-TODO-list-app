"use client"

import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * A container for a collapsible section.
 * This component is a wrapper around the `CollapsiblePrimitive.Root` component.
 */
const Collapsible = CollapsiblePrimitive.Root

/**
 * A button that toggles the collapsible section.
 * This component is a wrapper around the `CollapsiblePrimitive.CollapsibleTrigger` component.
 */
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

/**
 * The content that is shown or hidden in a collapsible section.
 * This component is a wrapper around the `CollapsiblePrimitive.CollapsibleContent` component.
 */
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
