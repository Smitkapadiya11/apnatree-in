declare module "splitting" {
  type SplittingTarget = Element | string;

  interface SplittingOptions {
    target?: SplittingTarget;
    by?: "chars" | "words" | "lines" | string;
  }

  function Splitting(options?: SplittingOptions): unknown;

  export default Splitting;
}
