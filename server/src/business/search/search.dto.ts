export interface SearchDto {
  keyword?: string;

  page: number;

  pageSize: number;

  orderBy?: string;
}
