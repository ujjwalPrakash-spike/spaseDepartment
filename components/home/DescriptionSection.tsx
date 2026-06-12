import React from "react";
import {
  TextRevealBlock,
  TextRevealWords,
  TextRevealHighlighted,
} from "@/components/ui/text-reveal";

export default function DescriptionSection() {
  // Word indices (0-based):
  // 0-12:  "Join discussions on distributed systems, cloud infrastructure, AI-assisted development, databases, performance optimization, and"
  // 13-14: "production-grade architecture." (highlighted)
  // 15-30: "Learn from experienced engineers, exchange ideas, and discover the technologies shaping the next generation of software."
  // Total: 31 words

  return (
    <section className="relative w-full px-10 py-32 z-10 ">
      <div className="grid grid-cols-12 border-black gap-x-4">
        <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-[32px] md:text-[48px] lg:text-[60px] font-light leading-[1.1] tracking-[-0.03em]">

          <TextRevealBlock wordCount={31}>
            <TextRevealWords startIndex={0}>
              Join discussions on distributed systems, cloud infrastructure, AI-assisted development, databases, performance optimization, and
            </TextRevealWords>{" "}
            <TextRevealHighlighted
              startIndex={13}
              action="highlight"
              color="#87CEFA"
              animationDuration={800}
              className="inline"
            >
              production-grade architecture.
            </TextRevealHighlighted>{" "}
            <TextRevealWords startIndex={15}>
              Learn from experienced engineers, exchange ideas, and discover the technologies shaping the next generation of software.
            </TextRevealWords>
          </TextRevealBlock>

        </div>
      </div>
    </section>
  );
}
