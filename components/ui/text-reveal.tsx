"use client"

import {
  createContext,
  useContext,
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { Highlighter } from "@/components/ui/highlighter"

/* ------------------------------------------------------------------ */
/*  Shared scroll context — one progress value for an entire block    */
/* ------------------------------------------------------------------ */

interface RevealContextValue {
  progress: MotionValue<number>
  totalWords: number
}

const RevealContext = createContext<RevealContextValue | null>(null)

/* ------------------------------------------------------------------ */
/*  TextRevealBlock — wraps a paragraph with one scrollYProgress      */
/* ------------------------------------------------------------------ */

export interface TextRevealBlockProps
  extends ComponentPropsWithoutRef<"p"> {
  /** Total number of words across ALL children for even pacing */
  wordCount: number
}

export const TextRevealBlock: FC<TextRevealBlockProps> = ({
  children,
  className,
  wordCount,
  ...props
}) => {
  const ref = useRef<HTMLParagraphElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.15"],
  })

  return (
    <RevealContext.Provider
      value={{ progress: scrollYProgress, totalWords: wordCount }}
    >
      <p ref={ref} className={className} {...props}>
        {children}
      </p>
    </RevealContext.Provider>
  )
}

/* ------------------------------------------------------------------ */
/*  TextRevealWords — plain text with scroll-reveal                   */
/* ------------------------------------------------------------------ */

export interface TextRevealWordsProps
  extends ComponentPropsWithoutRef<"span"> {
  children: string
  /** Starting word index within the paragraph (0-based) */
  startIndex: number
}

export const TextRevealWords: FC<TextRevealWordsProps> = ({
  children,
  className,
  startIndex,
}) => {
  const ctx = useContext(RevealContext)

  if (!ctx) {
    throw new Error("TextRevealWords must be used inside a TextRevealBlock")
  }
  if (typeof children !== "string") {
    throw new Error("TextRevealWords: children must be a string")
  }

  const words = children.split(/\s+/).filter(Boolean)

  return (
    <span className={cn("inline", className)}>
      {words.map((word, i) => {
        const globalIndex = startIndex + i
        const start = globalIndex / ctx.totalWords
        const end = start + 1 / ctx.totalWords
        return (
          <Word key={i} progress={ctx.progress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  TextRevealHighlighted — scroll-reveal + rough-notation highlight  */
/* ------------------------------------------------------------------ */

export interface TextRevealHighlightedProps
  extends ComponentPropsWithoutRef<"span"> {
  children: string
  /** Starting word index within the paragraph (0-based) */
  startIndex: number
  /** Highlighter action type */
  action?: "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket"
  /** Highlighter color */
  color?: string
  /** Highlighter stroke width */
  strokeWidth?: number
  /** Animation duration in ms */
  animationDuration?: number
}

export const TextRevealHighlighted: FC<TextRevealHighlightedProps> = ({
  children,
  className,
  startIndex,
  action = "highlight",
  color = "#ffd1dc",
  strokeWidth = 1.5,
  animationDuration = 600,
}) => {
  const ctx = useContext(RevealContext)

  if (!ctx) {
    throw new Error("TextRevealHighlighted must be used inside a TextRevealBlock")
  }
  if (typeof children !== "string") {
    throw new Error("TextRevealHighlighted: children must be a string")
  }

  const words = children.split(/\s+/).filter(Boolean)

  return (
    <Highlighter
      action={action}
      color={color}
      strokeWidth={strokeWidth}
      animationDuration={animationDuration}
      isView={true}
    >
      <span className={cn("inline", className)}>
        {words.map((word, i) => {
          const globalIndex = startIndex + i
          const start = globalIndex / ctx.totalWords
          const end = start + 1 / ctx.totalWords
          return (
            <Word key={i} progress={ctx.progress} range={[start, end]}>
              {word}
            </Word>
          )
        })}
      </span>
    </Highlighter>
  )
}

/* ------------------------------------------------------------------ */
/*  Internal Word component                                           */
/* ------------------------------------------------------------------ */

interface WordProps {
  children: ReactNode
  progress: MotionValue<number>
  range: [number, number]
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <span className="relative inline-block mr-[0.27em]">
      <motion.span style={{ opacity }} className="inline">
        {children}
      </motion.span>
    </span>
  )
}
