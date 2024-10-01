export class ListResponse<T> {
  content: T[];
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
}