
export interface ApiResponse<T> {
    data: T;
    responseType?: ResponseType,
    message?: string
}

export enum ResponseType {
    Success = 0,
    Error = 1
}