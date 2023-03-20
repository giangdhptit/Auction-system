export interface User {
    id: number;
    name: string;
    username:string;
    role:string;
    email:string;
    dob:string;
    address:string;
    balance:number;
    photosImagePath:string;
}

export interface LoginResponse{
    refreshToken:string;
    user:User;
    token:string;
}

export interface BaseResponse<T> {
    code:number;
    message:string;
    result: T;
}
