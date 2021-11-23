export interface Post {
  id: number;
  name: string;
  price: number;
}

export type IQueryParams = {
  page?: number;
  limit?: number;
  search?: string;
};
