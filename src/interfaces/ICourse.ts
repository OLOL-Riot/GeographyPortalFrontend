export interface ICourse {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  previewCourseSections: Array<ICourseSectionPreview>;
}

export interface ICourseSectionPreview {
  id: string;
  name: string;
  shortDescription: string;
}

export interface ICoursePreview {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  courseSectionIds: Array<string>;
}

export interface ICourseList extends Array<ICoursePreview> {}
