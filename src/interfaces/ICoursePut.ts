export default interface ICoursePut {
  name: string,
  description: string,
  shortDescription: string,
  courseSectionIds: Array<string>
}