import React from "react";
import { siteConfig } from "@/config/site";
import { TextReveal, TextRevealHighlight } from "@/components/ui/text-reveal";

export default function DescriptionSection() {
  const { description } = siteConfig.home;

  // Count words for continuous pacing across p1 fragments
  const p1StartWords = description.p1Start.trim().split(" ").length;
  const p1HighlightWords = description.p1Highlight.trim().split(" ").length;
  const p1EndWords = description.p1End.trim().split(" ").length;
  const p1Total = p1StartWords + p1HighlightWords + p1EndWords;

  return (
    <section className="relative w-full px-10 py-32 z-10 ">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-[32px] md:text-[48px] lg:text-[60px] font-light leading-[1.1] tracking-[-0.03em]">
          
          <p className="mb-10">
            <TextReveal>{description.p1Start}</TextReveal>
            <span className="text-[#1A4DFF] font-medium">
              <TextRevealHighlight
                wordOffset={p1StartWords}
                totalWords={p1Total}
              >
                {description.p1Highlight}
              </TextRevealHighlight>
            </span>
            <TextReveal>{description.p1End}</TextReveal>
          </p>
          <p>
            <TextReveal>{description.p2}</TextReveal>
          </p>

        </div>
      </div>
    </section>
  );
}
