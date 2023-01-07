import type { ITheorySections } from "./ITheorySection";

export default interface IUpdateTheory {
  name: string;
  description: string;
  shortDescription: string;
  theorySections: ITheorySections;
}

