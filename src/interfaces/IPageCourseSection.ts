import type ITheory from "./ITheory";

export default interface IPageCourseSection {
    id: string,
    name: string,
    shortDescription: string,
    serialNumber: number,
    theory: ITheory,
    testId: string
}