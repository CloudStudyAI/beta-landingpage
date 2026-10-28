// Borda ondulada decorativa nas laterais (só a partir de sm). Degradê do azul da marca ao azul-marinho do hero.
const paths = {
  left: { box: "0 0 260 1800", d: "M0 0c76 31 164 104 181 221 18 124-79 201-42 331 33 117 116 172 94 305-20 124-120 207-91 349 25 124 117 210 82 344-27 104-112 203-224 250V0Z" },
  right: { box: "0 0 260 1500", d: "M260 0c-71 39-158 112-177 225-21 123 67 209 28 338-36 119-105 183-80 314 23 121 113 190 91 324-19 115-86 225 138 299Z" },
} as const;

// Largura/offset ficam dentro da margem lateral, para a borda nunca cobrir texto.
const sizes = {
  left: "-left-7 w-14 md:-left-7 md:w-14 lg:-left-6 lg:w-16 xl:-left-6 xl:w-24 2xl:-left-4 2xl:w-32",
  right: "-right-7 w-14 md:-right-7 md:w-14 lg:-right-6 lg:w-16 xl:-right-6 xl:w-24 2xl:-right-4 2xl:w-32",
} as const;

export function SideWave({ className, id, side }: { className: string; id: string; side: "left" | "right" }) {
  const { box, d } = paths[side];
  return (
    <svg aria-hidden="true" viewBox={box} preserveAspectRatio="none" className={`pointer-events-none absolute z-0 hidden sm:block ${sizes[side]} ${className}`}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1877f2" />
          <stop offset="1" stopColor="#0b2a6f" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${id})`} />
    </svg>
  );
}
