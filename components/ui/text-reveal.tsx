"use client"

import {
  useRef,
  type ComponentPropsWithoutRef,
  type FC,
  type ReactNode,
} from "react"
import { motion, MotionValue, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/*  Word-level scroll-reveal that works INLINE inside any text block. */
/*  No sticky positioning or extra scroll height — it simply maps     */
/*  the parent container's scroll progress to per-word opacity.       */
/* ------------------------------------------------------------------ */

export interface TextRevealProps extends ComponentPropsWithoutRef<"span"> {
  children: string
  /** How far the scroll-trigger starts before entering the viewport.
   *  Negative = start earlier. E.g. "-20% 0px -20% 0px"              */
  offset?: string
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  offset = "-20% 0px -35% 0px",
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <span ref={containerRef} className={cn("inline", className)}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Highlighted variant — same reveal but keeps a custom color/style  */
/* ------------------------------------------------------------------ */

export interface TextRevealHighlightProps
  extends ComponentPropsWithoutRef<"span"> {
  children: string
  /** Total number of words BEFORE this span in the paragraph,
   *  so the reveal timing stays continuous across fragments.        */
  wordOffset?: number
  /** Total word count of the entire paragraph for consistent pacing */
  totalWords?: number
}

export const TextRevealHighlight: FC<TextRevealHighlightProps> = ({
  children,
  className,
  wordOffset = 0,
  totalWords,
}) => {
  const containerRef = useRef<HTMLSpanElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.25"],
  })

  if (typeof children !== "string") {
    throw new Error("TextRevealHighlight: children must be a string")
  }

  const words = children.split(" ")
  const total = totalWords ?? words.length + wordOffset

  return (
    <span ref={containerRef} className={cn("inline", className)}>
      {words.map((word, i) => {
        const globalIndex = wordOffset + i
        const start = globalIndex / total
        const end = start + 1 / total
        return (
          <HighlightWord
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
          >
            {word}
          </HighlightWord>
        )
      })}
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Internal word components                                          */
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

const HighlightWord: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span className="relative inline-block mr-[0.27em]">
      <motion.span style={{ opacity }} className="inline">
        {children}
      </motion.span>
    </span>
  )
}
