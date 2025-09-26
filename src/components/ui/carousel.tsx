"use client"

import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/** The API returned by the `useEmblaCarousel` hook. */
type CarouselApi = UseEmblaCarouselType[1]
/** The parameters for the `useEmblaCarousel` hook. */
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
/** The options for the `useEmblaCarousel` hook. */
type CarouselOptions = UseCarouselParameters[0]
/** The plugins for the `useEmblaCarousel` hook. */
type CarouselPlugin = UseCarouselParameters[1]

/** The props for the Carousel component. */
type CarouselProps = {
  /** The options for the `embla-carousel-react` library. */
  opts?: CarouselOptions
  /** The plugins for the `embla-carousel-react` library. */
  plugins?: CarouselPlugin
  /** The orientation of the carousel. */
  orientation?: "horizontal" | "vertical"
  /** A callback to get the carousel API. */
  setApi?: (api: CarouselApi) => void
}

/** The props for the Carousel context. */
type CarouselContextProps = {
  /** A ref to the carousel container element. */
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  /** The API for the `embla-carousel-react` library. */
  api: ReturnType<typeof useEmblaCarousel>[1]
  /** A function to scroll to the previous slide. */
  scrollPrev: () => void
  /** A function to scroll to the next slide. */
  scrollNext: () => void
  /** Whether the carousel can scroll to the previous slide. */
  canScrollPrev: boolean
  /** Whether the carousel can scroll to the next slide. */
  canScrollNext: boolean
} & CarouselProps

/** The context for the Carousel component. */
const CarouselContext = React.createContext<CarouselContextProps | null>(null)

/**
 * A hook to access the Carousel context.
 * @throws {Error} If used outside of a `<Carousel />` component.
 * @returns {CarouselContextProps} The Carousel context.
 */
function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

/**
 * A carousel component that displays a series of items in a scrollable container.
 * It is built on top of the `embla-carousel-react` library.
 * It forwards a ref to the underlying `div` element.
 * @param {object} props - The props for the component.
 * @param {'horizontal' | 'vertical'} [props.orientation='horizontal'] - The orientation of the carousel.
 * @param {CarouselOptions} [props.opts] - The options for the `embla-carousel-react` library.
 * @param {(api: CarouselApi) => void} [props.setApi] - A callback to get the carousel API.
 * @param {CarouselPlugin} [props.plugins] - The plugins for the `embla-carousel-react` library.
 * @param {string} [props.className] - The class name for the component.
 * @param {React.ReactNode} [props.children] - The children of the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered carousel component.
 */
const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

/**
 * A component that contains the content of the carousel.
 * It forwards a ref to the underlying `div` element.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered carousel content component.
 */
const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

/**
 * A component that represents a single item in the carousel.
 * It forwards a ref to the underlying `div` element.
 * @param {React.HTMLAttributes<HTMLDivElement>} props - The props for the component.
 * @param {React.Ref<HTMLDivElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered carousel item component.
 */
const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

/**
 * A button to scroll to the previous item in the carousel.
 * It forwards a ref to the underlying `Button` element.
 * @param {React.ComponentProps<typeof Button>} props - The props for the component.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered carousel previous button component.
 */
const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

/**
 * A button to scroll to the next item in the carousel.
 * It forwards a ref to the underlying `Button` element.
 * @param {React.ComponentProps<typeof Button>} props - The props for the component.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to forward to the component.
 * @returns {JSX.Element} The rendered carousel next button component.
 */
const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
