import {BaseResponse, LoginResponse} from "../../model/user";
import {appApi} from "../../api";

export const adminApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation<BaseResponse<LoginResponse>, { username: string, password: string }>({
            query: (credentials) => ({
                url: 'admin/login',
                method: 'POST',
                body: credentials,
            }),
        })
    }),
})
export const {
    useAdminLoginMutation,
} = adminApi;