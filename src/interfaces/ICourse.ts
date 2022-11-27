export interface ICourse {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  previewCourseSections: Array<ICourseSection>;
}

export interface ICourseSection {
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
