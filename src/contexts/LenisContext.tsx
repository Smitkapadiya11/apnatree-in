"use client";

import type Lenis from "lenis";
import * as React from "react";

export const LenisContext = React.createContext<Lenis | null>(null);

export function useLenis() {
  return React.useContext(LenisContext);
}
