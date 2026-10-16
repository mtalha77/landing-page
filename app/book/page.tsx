import type { Metadata } from "next";
import { SCHEDULER_URL } from "@/lib/scheduler";

export const metadata: Metadata = {
  title: "Book your call — RankOrbit",
  description:
    "Bring us the idea, business problem or process you want to improve.",
};

const background = [
  "radial-gradient(980px 620px at 92% -8%, rgba(176, 214, 206, 0.95), transparent 58%)",
  "radial-gradient(820px 560px at 4% -6%, rgba(168, 188, 214, 0.85), transparent 56%)",
  "radial-gradient(700px 420px at 50% 120%, rgba(255,255,255,0.72), transparent 60%)",
  "linear-gradient(180deg, #c3cedb 0%, #d4dce6 30%, #e4e8ec 68%, #eceeee 100%)",
].join(", ");

export default function BookPage() {
  return (
    <div className="h-dvh overflow-y-auto text-[#141414]" style={{ background }}>
      <main className="mx-auto flex w-full max-w-[920px] flex-col items-center px-5 py-16 text-center sm:py-20">
        <h1 className="font-heading text-[32px] leading-none font-black tracking-[-0.03em] text-[#111] sm:text-[40px]">
          Book your call
        </h1>

        <div className="mt-8 w-full overflow-hidden rounded-[24px] bg-white shadow-[0_24px_60px_-24px_rgba(15,23,42,0.28)]">
          {SCHEDULER_URL ? (
            <iframe
              src={SCHEDULER_URL}
              title="Book your call"
              className="h-[760px] w-full border-0"
            />
          ) : (
            <div className="h-[760px]" />
          )}
        </div>
      </main>
    </div>
  );
}
