import Image from "next/image";
import { BuildOptions } from "@/components/build-options";
import { FitFrame } from "@/components/fit-frame";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <div className="relative h-full overflow-hidden bg-[#d5dde6] text-[#141414]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(980px 620px at 92% -8%, rgba(176, 214, 206, 0.95), transparent 58%)",
            "radial-gradient(820px 560px at 4% -6%, rgba(168, 188, 214, 0.85), transparent 56%)",
            "radial-gradient(700px 420px at 50% 120%, rgba(255,255,255,0.72), transparent 60%)",
            "linear-gradient(180deg, #c3cedb 0%, #d4dce6 30%, #e4e8ec 68%, #eceeee 100%)",
          ].join(", "),
        }}
      />

      <SiteHeader />

      <main className="relative z-10 h-full min-h-0 overflow-hidden">
        <FitFrame>
        <p className="mb-4 flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-[#126E5A] uppercase">
          <span className="size-1.5 rounded-full bg-[#1AA56E]" />
          Custom software development
        </p>

        <h1 className="font-heading text-[40px] leading-[1.08] font-black tracking-[-0.035em] text-[#101114] sm:text-[56px]">
          Get <span className="text-[#126E5A]">custom software</span> designed,
          built
          <br className="hidden sm:block" /> and launched by one senior team
        </h1>

        <p className="mt-4 max-w-[920px] text-[18px] leading-[1.5] font-medium text-[#2C333A] sm:text-[20px]">
          Go from idea to live software in weeks. Custom apps, SaaS platforms
          and
          <br className="hidden sm:block" /> enterprise software from the squad
          behind 200+ shipped products.
        </p>

        <div className="relative z-0 mt-6 w-full max-w-[720px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -bottom-4 top-8 z-0 rounded-[32px] bg-[radial-gradient(ellipse_at_center,rgba(110,186,166,0.55),transparent_70%)] blur-md"
          />
        <section className="relative z-10 w-full rounded-[22px] border border-white bg-white px-5 py-8 shadow-[0_16px_36px_-18px_rgba(16,70,58,0.28)] sm:px-7 sm:py-10">
          <h2 className="font-heading text-[22px] font-bold tracking-[-0.02em] text-[#161616] sm:text-[26px]">
            Get your project scoped this week
          </h2>
          <p className="mt-2 text-[15px] text-[#8A919A] sm:text-base">
            Talk to a senior product lead. Pick a time in 60 seconds.
          </p>

          <h3 className="font-heading mt-5 text-[18px] font-bold tracking-[-0.01em] text-[#1a1a1a]">
            What do you want to build?
          </h3>

          <BuildOptions />

          <p className="mt-3.5 text-sm text-[#A7ADB4]">Takes under a minute.</p>
        </section>
        </div>

        <figure className="mt-5 flex max-w-[520px] flex-col items-center">
          <Image
            src="/avatar-rj.png"
            alt="Rickey Jasper"
            width={256}
            height={256}
            className="size-14 rounded-full object-cover"
          />
          <blockquote className="mt-3 max-w-[560px] text-base leading-[1.5] text-[#3C4148]">
            “We could rely on them to handle their part, which allowed us to
            focus on growing the business instead of constantly managing the
            build.”
          </blockquote>
          <figcaption className="mt-2.5 text-[15px] font-bold tracking-[-0.01em] text-[#1a1a1a]">
            Rickey Jasper, Co-Founder, ALTR House
          </figcaption>
        </figure>
        </FitFrame>
      </main>
    </div>
  );
}
