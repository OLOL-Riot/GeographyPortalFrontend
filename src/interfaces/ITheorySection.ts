export default interface ItheorySection {
    serialNumber: number,
    header: string,
    content: string
}

export interface ITheorySections extends Array<ItheorySection> { }