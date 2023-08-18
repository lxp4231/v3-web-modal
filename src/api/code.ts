export type ObjectType = Record<string, any>;
export interface HttpError {
  code: number;
  message: string;
}
export interface HttpData<T> {
  success: boolean;
  data?: T;
  error?: HttpError;
}

export interface HttpPageList<T> {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  list: T;
}
export interface IPage {
  page?: number;
  pageSize?: number;
}
