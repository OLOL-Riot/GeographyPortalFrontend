export interface ICourse {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  previewCourseSections: Array<ICourseSectionPreview>;
}

export interface ICourseSectionPreview {
  id: string;
  serialNumber: number;
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

export interface IUpdateCourse {
  name: string;
  description: string;
  shortDescription: string;
  previewCourseSections: Array<ICourseSectionPreview>;
}

export interface ICourseList extends Array<ICoursePreview> {}
