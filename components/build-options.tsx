"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const buildOptions = [
  "Replace spreadsheets and tools",
  "A new product or MVP",
  "Rebuild existing software",
  "Something else",
];

const budgetOptions = [
  "Less than $50,000",
  "$50,000 – $150,000",
  "$150,000 – $350,000",
  "$350,000 – $500,000",
  "$500,000 or more",
];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  project: "",
};

type Step = 2 | 3;
type FormState = typeof emptyForm;

function ArrowRight({ light = false }: { light?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={`size-[18px] shrink-0 ${light ? "text-white" : "text-[#1a1a1a]"}`}
    >
      <path
        d="M4 10h12M11.5 5.5 16 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const fieldClass =
  "h-12 w-full rounded-[14px] border border-[#E4E4E4] bg-white px-4 text-[16px] text-[#1a1a1a] outline-none transition duration-200 placeholder:text-[#C8C8C8] focus:border-[#111] focus:shadow-[0_0_0_3px_rgba(0,0,0,0.05)]";

export function BuildOptions() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [present, setPresent] = useState(false);
  const [active, setActive] = useState(false);
  const [step, setStep] = useState<Step>(2);
  const [stepOn, setStepOn] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [tried, setTried] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setPresent(true);
      const frame = requestAnimationFrame(() => {
        requestAnimationFrame(() => setActive(true));
      });
      return () => cancelAnimationFrame(frame);
    }

    setActive(false);
    const timer = window.setTimeout(() => setPresent(false), 280);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openAtBudget = () => {
    setStep(2);
    setStepOn(true);
    setForm(emptyForm);
    setTried(false);
    setOpen(true);
  };

  const close = () => setOpen(false);

  const changeStep = (next: Step) => {
    if (next === step) return;
    setStepOn(false);
    window.setTimeout(() => {
      setStep(next);
      setStepOn(true);
    }, 180);
  };

  const back = () => {
    if (step === 3) changeStep(2);
    else close();
  };

  const update = (key: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const missing = {
    firstName: !form.firstName.trim(),
    lastName: !form.lastName.trim(),
    email: !form.email.trim(),
    phone: !form.phone.trim(),
    project: !form.project.trim(),
  };

  const bookCall = () => {
    setTried(true);
    if (Object.values(missing).some(Boolean)) return;
    router.push("/book");
  };

  const invalid = (key: keyof typeof missing) =>
    tried && missing[key] ? "border-[#E11D2E] focus:border-[#E11D2E]" : "";

  return (
    <>
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {buildOptions.map((label) => (
          <button
            key={label}
            type="button"
            onClick={openAtBudget}
            className="flex h-12 cursor-pointer items-center justify-between gap-3 rounded-[10px] border border-[#E4E4E4] bg-white px-5 text-left text-[17px] font-medium whitespace-nowrap text-[#2C2C2C] transition duration-200 hover:-translate-y-0.5 hover:border-[#D0D0D0] hover:bg-[#FAFAFA]"
          >
            <span>{label}</span>
            <ArrowRight />
          </button>
        ))}
      </div>

      {mounted && present
        ? createPortal(
            <div
              className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-md transition-opacity duration-300 ${
                active ? "opacity-100" : "opacity-0"
              }`}
              onClick={close}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="scope-title"
                className={`relative max-h-[92vh] w-full max-w-[680px] overflow-y-auto rounded-[28px] bg-white px-6 py-7 text-left shadow-2xl transition duration-300 sm:px-8 sm:py-8 ${
                  active
                    ? "translate-y-0 scale-100 opacity-100"
                    : "translate-y-4 scale-[0.96] opacity-0"
                }`}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-5 right-5 z-10 flex size-9 cursor-pointer items-center justify-center rounded-full border border-[#ECECEC] text-[#666] transition hover:rotate-90 hover:bg-[#F7F7F7]"
                >
                  <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
                    <path
                      d="M5 5l10 10M15 5 5 15"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <div
                  className={`transition duration-200 ${
                    stepOn
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  }`}
                >
                  <>
                      <div className="flex items-baseline gap-3 pr-12">
                        <h2
                          id="scope-title"
                          className="font-heading text-[26px] font-bold tracking-[-0.03em] text-[#111] sm:text-[30px]"
                        >
                          Get your project scoped this week
                        </h2>
                        <span className="shrink-0 text-[20px] font-medium text-[#C4C4C4]">
                          {step} / 3
                        </span>
                      </div>
                      <p className="mt-2 text-[16px] text-[#9AA0A6]">
                        Talk to a senior product lead. Pick a time in 60
                        seconds.
                      </p>

                      <div className="mt-5 flex gap-3">
                        {[1, 2, 3].map((bar) => (
                          <span
                            key={bar}
                            className="h-[5px] flex-1 overflow-hidden rounded-full bg-[#E6E6E6]"
                          >
                            <span
                              className={`block h-full rounded-full bg-black transition-transform duration-500 ${
                                bar <= step ? "translate-x-0" : "-translate-x-full"
                              }`}
                            />
                          </span>
                        ))}
                      </div>

                      {step === 2 ? (
                        <>
                          <h3 className="font-heading mt-6 text-[18px] font-bold text-[#161616]">
                            What is your budget?
                          </h3>
                          <div className="mt-3 flex flex-col gap-3">
                            {budgetOptions.map((label, index) => (
                              <button
                                key={label}
                                type="button"
                                onClick={() => changeStep(3)}
                                style={{ transitionDelay: `${index * 30}ms` }}
                                className="flex h-[58px] cursor-pointer items-center justify-between rounded-[14px] border border-[#E6E6E6] px-5 text-left text-[17px] text-[#1a1a1a] transition duration-200 hover:translate-x-1 hover:border-[#D0D0D0] hover:bg-[#FAFAFA]"
                              >
                                <span>{label}</span>
                                <ArrowRight />
                              </button>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={back}
                            className="mt-6 cursor-pointer rounded-[12px] border border-[#E4E4E4] px-5 py-2.5 text-[15px] text-[#222] transition hover:bg-[#FAFAFA]"
                          >
                            Back
                          </button>
                        </>
                      ) : (
                        <form
                          className="mt-6"
                          onSubmit={(event) => {
                            event.preventDefault();
                            bookCall();
                          }}
                        >
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <label className="block text-[15px] font-medium text-[#1a1a1a]">
                              First name
                              <input
                                value={form.firstName}
                                onChange={(event) =>
                                  update("firstName", event.target.value)
                                }
                                placeholder="Alex"
                                autoComplete="given-name"
                                className={`${fieldClass} mt-2 ${invalid("firstName")}`}
                              />
                            </label>
                            <label className="block text-[15px] font-medium text-[#1a1a1a]">
                              Last name
                              <input
                                value={form.lastName}
                                onChange={(event) =>
                                  update("lastName", event.target.value)
                                }
                                placeholder="Rivera"
                                autoComplete="family-name"
                                className={`${fieldClass} mt-2 ${invalid("lastName")}`}
                              />
                            </label>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-4">
                            <label className="block text-[15px] font-medium text-[#1a1a1a]">
                              Work email
                              <input
                                type="email"
                                value={form.email}
                                onChange={(event) =>
                                  update("email", event.target.value)
                                }
                                placeholder="alex@company.com"
                                autoComplete="email"
                                className={`${fieldClass} mt-2 ${invalid("email")}`}
                              />
                            </label>

                            <label className="block text-[15px] font-medium text-[#1a1a1a]">
                              Phone number
                              <input
                                type="tel"
                                value={form.phone}
                                onChange={(event) =>
                                  update("phone", event.target.value)
                                }
                                placeholder="+1 555 000 0000"
                                autoComplete="tel"
                                className={`${fieldClass} mt-2 ${invalid("phone")}`}
                              />
                            </label>
                          </div>

                          <label className="mt-4 block text-[15px] font-medium text-[#1a1a1a]">
                            Company name{" "}
                            <span className="font-normal text-[#B0B0B0]">
                              optional
                            </span>
                            <input
                              value={form.company}
                              onChange={(event) =>
                                update("company", event.target.value)
                              }
                              placeholder="Acme Inc"
                              autoComplete="organization"
                              className={`${fieldClass} mt-2`}
                            />
                          </label>

                          <label className="mt-4 block text-[15px] font-medium text-[#1a1a1a]">
                            Tell us a bit more about your project
                            <textarea
                              value={form.project}
                              onChange={(event) =>
                                update("project", event.target.value)
                              }
                              placeholder="A few lines on the product, the problem, and any timeline..."
                              rows={4}
                              className={`${fieldClass} mt-2 h-auto min-h-[120px] resize-y py-3 ${invalid("project")}`}
                            />
                          </label>

                          <div className="mt-5 flex items-center gap-3">
                            <button
                              type="button"
                              onClick={back}
                              className="cursor-pointer rounded-[12px] border border-[#E4E4E4] px-5 py-3 text-[15px] text-[#222] transition hover:bg-[#FAFAFA]"
                            >
                              Back
                            </button>
                            <button
                              type="submit"
                              className="flex h-[52px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-black text-[16px] font-medium text-white transition hover:bg-[#222]"
                            >
                              Book my call
                              <ArrowRight light />
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
