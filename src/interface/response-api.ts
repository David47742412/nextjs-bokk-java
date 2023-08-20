export interface IResponseApi<T> {
  statusCode: number;
  message: string;
  body: T[];
}
