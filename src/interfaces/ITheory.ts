import type { ITheorySections } from "./ITheorySection"

export default interface Itheory {
    id: string,
    name: string,
    description: string,
    shortDescription: string,
    theorySections: ITheorySections
} 