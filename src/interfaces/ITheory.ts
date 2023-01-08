import type { ITheorySections } from "./ITheorySection"

export default interface ITheory {
    id: string,
    name: string,
    description: string,
    shortDescription: string,
    theorySections: ITheorySections
} 