import React from "react";
import { siteConfig } from "@/config/site";
import ScrollFloat from "@/components/reactBits/ScrollFloat";

export default function DescriptionSection() {
  const { description } = siteConfig.home;

  return (
    <section className="relative w-full px-10 py-32 z-10 ">
      <div className="grid grid-cols-12 gap-x-4">
        <div className="col-span-12 lg:col-start-3 lg:col-span-8 text-[32px] md:text-[48px] lg:text-[60px] font-light leading-[1.1] tracking-[-0.03em]">
          <p className="mb-10">
            {description.p1Start}
            <span className="text-[#1A4DFF] font-medium">{description.p1Highlight}</span>
            {description.p1End}
          </p>
          <div className="-ml-1">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="!my-0"
              textClassName="!text-[32px] md:!text-[48px] lg:!text-[60px] !font-light !leading-[1.1] !tracking-[-0.03em]"
            >
              {description.p2}
            </ScrollFloat>
          </div>
        </div>
      </div>
    </section>
  );
}
