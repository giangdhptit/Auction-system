import {BaseResponse, LoginResponse} from "../../model/user";
import {appApi} from "../../api";

export const authApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<BaseResponse<LoginResponse>, { username: string, password: string }>({
            query: (credentials) => ({
                url: 'user/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<boolean, { username: string, password: string, name: string, address: string, email: string, dob: string, balance: number,imageUser:File }>({
            query (data) {
                const formData=new FormData();
                formData.append("username",data.username);
                formData.append("password",data.password);
                formData.append("name",data.name);
                formData.append("address",data.address);
                formData.append("email",data.email);
                formData.append("dob",data.dob);
                formData.append("balance",data.balance.toString());
                formData.append("imageUser",data.imageUser);
                return {
                    url: 'user/register',
                    method: "POST",
                    body: formData,
                }
            },
        })
    }),
})
export const {useLoginMutation, useRegisterMutation} = authApi;