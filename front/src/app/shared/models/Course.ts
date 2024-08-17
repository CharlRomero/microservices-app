export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface ICourse {
  id?: string | undefined;
  name: string;
}
