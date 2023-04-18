export interface CollectionResponse<T = any> {
  count: number;
  pageNumber: number;
  totalPages: number;
  data: T[];
}
