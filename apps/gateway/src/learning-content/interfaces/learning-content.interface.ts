export interface LearningContentsFilterQueryRequest {
  currentPage: number;
  pageSize: number;
  search?: string;
  subjectId?: string;
}
