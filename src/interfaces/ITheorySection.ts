export default interface ITheorySection {
    serialNumber: number,
    header: string,
    content: string
}

export interface ITheorySections extends Array<ITheorySection> { }