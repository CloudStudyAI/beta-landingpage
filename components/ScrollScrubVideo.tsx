"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ScrollScrubVideoProps = {
  src: string;
  className?: string;
};

export function ScrollScrubVideo({ src, className }: ScrollScrubVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [duration, setDuration] = useState(0);
  const [ready, setReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const video = videoRef.current;

    if (!video || !duration || !ready) {
      return;
    }

    if (video.readyState < 2) {
      return;
    }

    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      const progress = Math.min(Math.max(latest, 0), 1);
      const targetTime = progress * duration;
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = Math.min(targetTime, Math.max(duration - 0.04, 0));
      }
    });
  });

  return (
    <div ref={containerRef} className={`relative w-full max-w-[520px] ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-[14%] -z-10 rounded-full bg-blue-500/18 blur-3xl" />
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="auto"
        controls={false}
        className="h-auto w-full object-contain mix-blend-multiply [mask-image:radial-gradient(circle_at_center,black_60%,transparent_100%)]"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          video.pause();
          video.currentTime = 0;
          setDuration(video.duration);
          setReady(true);
        }}
      />
    </div>
  );
}
