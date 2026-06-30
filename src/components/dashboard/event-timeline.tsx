"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { EVENT_TYPE_LABELS } from "@/lib/constants/navigation";
import { formatEventDate } from "@/lib/utils";
import type { Event } from "@/lib/types";

export function EventTimeline({ events }: { events: Event[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [fillStyle, setFillStyle] = useState<{ top: number; height: number } | null>(null);

  useEffect(() => {
    if (events.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const nextIndex = Number(visibleEntry.target.getAttribute("data-index"));
          setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-15% 0px -35% 0px",
      },
    );

    itemRefs.current.forEach((node) => {
      if (node) {
        observer.observe(node);
      }
    });

    return () => observer.disconnect();
  }, [events.length]);

  if (events.length === 0) {
    return null;
  }

  const filledHeight = `${((activeIndex + 1) / (events.length + 1)) * 100}%`;

  // Recalculate fill top/height so the colored line reaches the active marker center
  useEffect(() => {
    const recalc = () => {
      const nodes = itemRefs.current;
      const container = containerRef.current;
      if (!container || !nodes.length) return;

      const first = nodes[0];
      const active = nodes[Math.min(activeIndex, nodes.length - 1)];
      if (!first || !active) return;

      const markerCenterOffset = 16; // half of h-8 (32px)
      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const activeRect = active.getBoundingClientRect();

      const top = firstRect.top + window.scrollY - (containerRect.top + window.scrollY) + markerCenterOffset;
      const bottom = activeRect.top + window.scrollY - (containerRect.top + window.scrollY) + markerCenterOffset;
      const height = Math.max(0, bottom - top);
      setFillStyle({ top, height });
    };

    recalc();
    window.addEventListener("resize", recalc);
    window.addEventListener("scroll", recalc, { passive: true });
    return () => {
      window.removeEventListener("resize", recalc);
      window.removeEventListener("scroll", recalc);
    };
  }, [activeIndex, events.length]);

  return (
    <div ref={containerRef} className="relative px-3 py-8 sm:px-6">
      <div className="absolute left-5 top-8 bottom-8 w-px bg-gradient-to-b from-secondary/25 via-secondary/20 to-transparent sm:left-1/2 sm:-translate-x-1/2" />
      <div
        className="absolute left-5 bg-gradient-to-b from-primary to-primary/80 transition-all duration-300 sm:left-1/2 sm:-translate-x-1/2"
        style={
          fillStyle
            ? { top: `${fillStyle.top}px`, height: `${fillStyle.height}px`, width: "1px" }
            : { top: "8px", height: filledHeight }
        }
      />

        <div className="space-y-20 sm:space-y-28">
          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const isActive = index <= activeIndex;

            return (
              <div
                key={event.id}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                data-index={index}
                className="relative pl-10 sm:pl-0"
              >
                <div
                  className={`absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold shadow-md transition-all duration-300 sm:left-1/2 sm:-translate-x-1/2 ${
                    isActive
                      ? "border-primary/20 bg-primary text-white shadow-primary/20"
                      : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>

                <div className={isLeft ? "sm:mr-[calc(50%+1.25rem)] sm:pr-6" : "sm:ml-[calc(50%+1.25rem)] sm:pl-6"}>
                  <div className="rounded-[24px] bg-transparent p-0">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
                        <p
                          className={`text-[11px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-secondary"
                          }`}
                        >
                          {EVENT_TYPE_LABELS[event.type]}
                        </p>
                        <span className="text-xs">{formatEventDate(event.date)}</span>
                      </div>
                      <h4 className={`text-base font-semibold transition-colors duration-300 ${isActive ? "text-primary" : "text-foreground"}`}>
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2">
                          <Clock className="h-4 w-4 text-secondary" />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-secondary" />
                          {event.venue}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
