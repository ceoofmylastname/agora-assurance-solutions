/* Pinned horizontal timeline (adapted from the Hyperiux Vault component on
   21st.dev). The section pins, the track slides sideways with the scroll, the
   line grows, and each milestone draws its stem and reveals its copy with a
   SplitText line mask as it reaches centre. Data-driven: pass `items`. */
import { type CSSProperties, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

function useGSAP(callback: () => void | (() => void), options?: { dependencies?: unknown[]; scope?: { current: Element | null } | Element | null }) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el = scope && typeof scope === "object" && "current" in scope ? scope.current : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type TimelineItem = {
  id: string;
  /** The big line, e.g. "Phase one" or "2026 March". */
  label: string;
  /** The muted copy under it. */
  content: string;
  /** Top row or bottom row. Alternate for the classic look. */
  row?: "top" | "bottom";
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  items: TimelineItem[];
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
  id?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const subscribeToReducedMotion = (cb: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getReducedMotionSnapshot = () => (typeof window === "undefined" ? false : window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false);
const usePrefersReducedMotion = () => useSyncExternalStore(subscribeToReducedMotion, getReducedMotionSnapshot, () => false);

type SplitTextInstance = InstanceType<typeof SplitText>;

export default function Timeline({
  title = "Product Storyline",
  periodLabel = "2020-2026",
  items,
  textColor = "#0d2238",
  mutedTextColor = "#5b6b7c",
  activeColor = "#15AFF7",
  backgroundColor = "#ffffff",
  imageUrl,
  imageAlt = "",
  duration,
  scrollDuration = 1.2,
  id = "journey",
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const normalizedDuration = Math.max(0.2, duration ?? scrollDuration);
  const sectionStyle: CSSProperties = { color: textColor, backgroundColor };
  const activeStyle: CSSProperties = { backgroundColor: activeColor };
  const mutedTextStyle: CSSProperties = { color: mutedTextColor };

  const topItems = items.filter((it, i) => (it.row ?? (i % 2 === 0 ? "top" : "bottom")) === "top");
  const bottomItems = items.filter((it, i) => (it.row ?? (i % 2 === 0 ? "top" : "bottom")) === "bottom");

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const isMobile = window.innerWidth < 600;
    const slidePercent = isMobile ? -57 : -65;
    const lineWidth = isMobile ? "65%" : "98%";
    const lineStart = isMobile ? "top 30%" : "top 25%";
    // Pin for the whole section so the stage never scrolls away early.
    const slideEnd = "bottom bottom";
    const lineEnd = "bottom bottom";

    // GSAP pins the stage itself (CSS sticky breaks under any overflow-x:hidden ancestor).
    const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: slideEnd, scrub: true, pin: stageRef.current, pinSpacing: false, anticipatePin: 1 }, defaults: { ease: "none" } });
    tl.fromTo(wholeSliderRef.current, { xPercent: 0 }, { xPercent: slidePercent });

    if (reducedMotion) {
      gsap.set(".journey-line", { width: lineWidth });
      return;
    }
    gsap.to(".journey-line", { width: lineWidth, ease: "none", scrollTrigger: { trigger: section, start: lineStart, end: lineEnd, scrub: true } });
  }, { dependencies: [reducedMotion], scope: sectionRef });

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reducedMotion) {
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, { scaleY: 1 });
        gsap.set(`.jd-${item.id}`, { scale: 1 });
        gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
        gsap.set(`.description-${item.id}`, { opacity: 1, clearProps: "transform" });
      });
      return;
    }

    items.forEach((item) => {
      gsap.set(`.jl-${item.id}`, { scaleY: 0, transformOrigin: "bottom bottom" });
      gsap.set(`.jd-${item.id}`, { scale: 0 });
      gsap.set(`.title-${item.id}`, { opacity: 1 });
      gsap.set(`.description-${item.id}`, { opacity: 1 });
    });

    const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
    const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};
    items.forEach((item) => {
      titleSplits[item.id] = new SplitText(`.title-${item.id}`, { type: "chars, words, lines", mask: "lines" });
      descriptionSplits[item.id] = new SplitText(`.description-${item.id}`, { type: "chars, words, lines", mask: "lines" });
    });

    const createItemTimeline = (item: TimelineItem, startPos: number, endPos: number) => {
      const lineSelector = `.jl-${item.id}`;
      const dotSelector = `.jd-${item.id}`;
      const titleLines = titleSplits[item.id]?.lines || [];
      const descriptionLines = descriptionSplits[item.id]?.lines || [];
      const isTop = topItems.some((t) => t.id === item.id);
      if (!isTop) gsap.set(lineSelector, { transformOrigin: "top top" });

      const timeline = gsap.timeline({ scrollTrigger: { trigger: section, start: `${startPos}% 30%`, end: `${endPos}% 50%`, scrub: true } });
      timeline
        .to(lineSelector, { scaleY: 1, duration: normalizedDuration * 0.4 })
        .to(dotSelector, { scale: 1, duration: normalizedDuration * 0.4 }, "<")
        .fromTo(titleLines, { y: 100 }, { y: 0, delay: -0.8 * normalizedDuration, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" })
        .fromTo(descriptionLines, { y: 100 }, { y: 0, duration: normalizedDuration, stagger: 0.02, ease: "power2.out" }, "<");
      return timeline;
    };

    // Evenly spaced windows across the pinned scroll, however many items there are.
    const n = items.length;
    const mobile = window.innerWidth < 600;
    const first = mobile ? 22 : 6;
    const last = mobile ? 69 : 65;
    const span = mobile ? 10 : 20;
    items.forEach((item, index) => {
      const startPos = n > 1 ? first + ((last - first) * index) / (n - 1) : first;
      createItemTimeline(item, startPos, startPos + span);
    });

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);
    return () => {
      Object.values(titleSplits).forEach((s) => s?.revert?.());
      Object.values(descriptionSplits).forEach((s) => s?.revert?.());
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [normalizedDuration, reducedMotion, items.length], scope: sectionRef });

  return (
    <section ref={sectionRef} id={id} className="h-[200vw] max-[600px]:h-[400vh] w-full relative" style={sectionStyle}>
      <div ref={stageRef} className="h-screen w-full pt-[10%] overflow-hidden">
        <div ref={wholeSliderRef} className="mr-[2vw] flex h-[30vw] w-[240vw] items-center gap-[5vw] px-[5vw] max-[600px]:h-[80vh] max-[600px]:w-[800vw] max-[600px]:px-[7vw]">
          {imageUrl ? (
            <div className="h-full w-[30vw] overflow-hidden rounded-[1vw] max-[600px]:h-[65vw] max-[600px]:w-[85vw] max-[600px]:rounded-[5vw]">
              <img src={imageUrl} alt={imageAlt} draggable={false} className="h-full w-full object-cover" />
            </div>
          ) : null}

          <div className="relative h-full w-full">
            <div className="w-full absolute left-0 top-[49%] flex items-center h-fit">
              <div className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full" style={activeStyle} />
              <div className="h-px w-[0%] rounded-full journey-line" style={activeStyle} />
              <div className="h-[.8vw] max-[600px]:h-[2vw] max-[600px]:w-[2vw] w-[.8vw] rounded-full" style={activeStyle} />
            </div>

            <div className="flex h-1/2 w-full items-center justify-start gap-[.5vw]">
              <div className="h-full w-[20%] pt-[2vw] max-[600px]:h-fit max-[600px]:pt-[5vw]">
                <h2 className="ws-display w-[65%] text-[3vw] font-bold leading-[0.95] max-[600px]:text-[8.5vw]">{title}</h2>
              </div>
              <div className="w-full flex h-full gap-x-[15vw] max-[600px]:gap-x-[40vw]">
                {topItems.map((item) => (
                  <div key={`top-${item.id}`} className="relative h-full w-[30vw] px-[3vw] max-[600px]:flex max-[600px]:w-[70vw] max-[600px]:flex-col max-[600px]:px-[7vw]">
                    <div className="w-full absolute left-0 bottom-0 top-0 h-full">
                      <div className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative aspect-square rounded-full jd-${item.id}`} style={activeStyle} />
                      <div className={`h-[94%] w-px origin-bottom rounded-full jl-${item.id}`} style={activeStyle} />
                    </div>
                    <div className="mt-[-1vw] space-y-[1vw] max-[600px]:mt-[-2vw]">
                      <h4 className={`title-${item.id} ws-display font-semibold text-[2.5vw] leading-none max-[600px]:text-[6.4vw]`}>{item.label}</h4>
                      <p className={`description-${item.id} w-[90%] text-[1.5vw] leading-[1.15] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`} style={mutedTextStyle}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-1/2 flex items-center justify-start w-full">
              <div className="w-[34%] pt-[2vw] max-[600px]:pt-[5vw] max-[600px]:w-[30%] h-full">
                <p className="text-[1.65vw] leading-none max-[600px]:text-[4.2vw]" style={mutedTextStyle}>{periodLabel}</p>
              </div>
              <div className="w-full flex h-full gap-x-[20vw] ml-[7vw] max-[600px]:gap-x-[40vw] max-[600px]:ml-[7vw]">
                {bottomItems.map((item) => (
                  <div key={`bottom-${item.id}`} className="relative h-full w-[25vw] px-[3vw] max-[600px]:w-[70vw] max-[600px]:px-[7vw]">
                    <div className="w-full absolute left-0 bottom-[-1%] h-full">
                      <div className={`h-[94%] origin-top w-px rounded-full max-[600px]:h-full jl-${item.id}`} style={activeStyle} />
                      <div className={`size-[1vw] max-[600px]:size-[2.5vw] translate-x-[-50%] relative w-auto aspect-square rounded-full jd-${item.id}`} style={activeStyle} />
                    </div>
                    <div className="flex h-full w-full flex-col justify-end space-y-[1vw]">
                      <h4 className={`title-${item.id} ws-display font-semibold text-[2.5vw] leading-none max-[600px]:text-[6.4vw]`}>{item.label}</h4>
                      <p className={`description-${item.id} w-[90%] text-[1.5vw] leading-[1.15] max-[600px]:w-[90%] max-[600px]:text-[4.8vw]`} style={mutedTextStyle}>{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
