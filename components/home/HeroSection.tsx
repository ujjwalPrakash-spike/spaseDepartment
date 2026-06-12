import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { siteConfig } from "@/config/site";
import RotatingText from "@/components/reactBits/RotatingText";
export default function HeroSection() {
  const { hero } = siteConfig.home;
  return (
    <section className="relative w-full px-6 lg:px-10 pt-8 pb-20">
      <div className="w-[85vw] mx-auto flex flex-col min-h-[75vh]">
        {/* HERO */}
        <div className="flex flex-1 mt-6 min-w-0">
          <div className="w-full min-w-0">
            <h1
              className="
                font-normal
                leading-[0.95]
                tracking-[-0.06em]
                text-[clamp(3.2rem,8.5vw,11rem)]
                text-[#2E3129]
              "
            >
              {/* Line 1 */}
              <span className="block">
                {hero.titleLine1}
              </span>
              {/* Line 2 */}
              <span className="flex items-center gap-[0.15em] min-w-0 -mt-[0.05em]">
                <span>
                  {hero.titleLine2}
                </span>
                <div
                  className="w-[1.5em] h-[1.5em] shrink-0"
                  style={{ mixBlendMode: "multiply" }}
                >
                  <DotLottieReact
                    src="https://lottie.host/43576938-961f-47db-863e-dcde945ced21/aOYzYLyjIH.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </span>
              {/* Rotating Text */}
              <span className="block text-[#1A4DFF] -mt-[0.05em]">
                <div>
                  <RotatingText
                    texts={[
                      "Engineering",
                      "Design",
                      "Deployment",
                      "Systems",
                      "Infrastructure",
                    ]}
                    mainClassName="
                      overflow-hidden
                      justify-start
                      pb-[0.2em]
                      -mb-[0.2em]
                    "
                    splitBy="words"
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    splitLevelClassName="
                      overflow-hidden
                      pb-[0.2em]
                      -mb-[0.2em]
                    "
                    transition={{
                      type: "spring",
                      damping: 30,
                      stiffness: 400,
                    }}
                    rotationInterval={2000}
                  />
                </div>
              </span>
            </h1>
          </div>
        </div>
        {/* FOOTER */}
        <div className="grid grid-cols-12 items-center gap-y-8 gap-x-6 mt-10">

  {/* LEFT */}
  <div className="flex items-center gap-2 whitespace-nowrap">
    <span className="font-bold text-[14px]">
      {hero.footerPrefix}
    </span>

    <span className="text-[12px] text-[#111111]">
      {hero.footerText}
    </span>
  </div>

  {/* CENTER CTA */}
  <div className="col-span-12 md:col-start-3 md:col-span-3">
    <button className="relative group overflow-hidden w-full bg-transparent py-3.5 px-6 rounded-sm font-bold uppercase tracking-wide text-[13px] border-2 border-[#555555] text-[#2f2f2f]">
      <span className="absolute top-0 left-0 w-full h-full bg-[#313131] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-300 ease-out z-0"></span>

      <span className="relative z-10 flex items-center justify-center gap-3 w-full h-full group-hover:text-white transition-colors duration-300">
        {hero.cta}
      </span>
    </button>
  </div>

  {/* RIGHT */}
  <div className="col-span-12 md:col-start-10 md:col-span-3">
    <div className="text-[#1A4DFF] text-[12px] leading-none mb-3">
      ✳
    </div>

    <p className="text-[12px] leading-[1.7] text-[#111111]">
      {hero.descriptionInfo}
    </p>
  </div>

</div>
      </div>
    </section>
  );
}