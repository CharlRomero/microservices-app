export interface ApiResponse<T> {
    message?: string;
    data: T;
}

export interface IUser {
    id?: string | undefined;
    name: string
    email: string
    password: string;
 }
