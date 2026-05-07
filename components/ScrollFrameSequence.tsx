"use client";

import Image from "next/image";
import { useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const FRAME_COUNT = 603;
const END_AT = 0.45;

function framePath(index: number) {
  const frameNumber = String(index + 1).padStart(4, "0");
  return `/robot-frames/frame-${frameNumber}.webp`;
}

export function ScrollFrameSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.3,
  });

  const frames = useMemo(
    () => Array.from({ length: FRAME_COUNT }, (_, index) => framePath(index)),
    [],
  );

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const progress = Math.min(Math.max(latest, 0), 1);
    const normalizedProgress = Math.min(progress / END_AT, 1);
    const nextFrame = Math.round(normalizedProgress * (FRAME_COUNT - 1));

    setFrameIndex((current) => (current === nextFrame ? current : nextFrame));
  });

  useEffect(() => {
    for (let i = -12; i <= 12; i += 1) {
      const preloadIndex = frameIndex + i;

      if (preloadIndex >= 0 && preloadIndex < FRAME_COUNT) {
        const image = new window.Image();
        image.src = frames[preloadIndex];
      }
    }
  }, [frameIndex, frames]);

  return (
    <div ref={containerRef} className="relative flex w-full max-w-[560px] items-center justify-center">
      <Image
        src={frames[frameIndex]}
        alt="Robô tutor da CloudStudy"
        width={1080}
        height={1920}
        unoptimized
        sizes="(min-width: 768px) 560px, 80vw"
        className="mx-auto h-auto max-h-[640px] w-auto max-w-full object-contain mix-blend-multiply"
      />
    </div>
  );
}
