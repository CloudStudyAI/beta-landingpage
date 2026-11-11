"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

// O servidor nao sabe se a pessoa pediu menos movimento. Se o primeiro desenho no navegador ja
// usar essa preferencia, ele sai diferente do HTML do servidor e o React descarta a pagina e
// redesenha tudo. Este hook devolve "sem preferencia" no primeiro desenho e o valor real logo
// depois de montar; `mounted` avisa quando o valor ja e o real.
export function useReducedMotionSafe(): { reduce: boolean; mounted: boolean } {
  const prefers = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return { reduce: mounted && Boolean(prefers), mounted };
}
