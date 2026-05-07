"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LOGO_SRC = "/Logo-CloudStudy (1).png";

export function CloudStudyIntro() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      <motion.div
        className="cloudstudy-intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        initial={{ opacity: 1 }}
        animate={{ opacity: prefersReducedMotion ? 1 : [1, 1, 0] }}
        exit={{ opacity: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.2 : 1.7,
          times: prefersReducedMotion ? undefined : [0, 0.68, 1],
          ease: [0.76, 0, 0.24, 1],
        }}
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={
            prefersReducedMotion
              ? { opacity: 0, scale: 1.04 }
              : {
                  opacity: [1, 1, 0],
                  scale: [1, 1.18, 1.65],
                }
          }
          transition={{
            duration: prefersReducedMotion ? 0.55 : 1.45,
            times: prefersReducedMotion ? undefined : [0, 0.48, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Image
            src={LOGO_SRC}
            alt="CloudStudy"
            width={900}
            height={600}
            priority
            className="h-auto w-[clamp(260px,42vw,560px)] select-none"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
