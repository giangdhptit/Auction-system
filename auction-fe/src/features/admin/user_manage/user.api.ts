import {appApi} from "../../../api";
import {BaseResponse, User} from "../../../model/user";

export const userApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<BaseResponse<User[]>, void>({
            query: () => ({
                url: 'user/getAllUsers'
            }),
            providesTags: ['User'],
        }),
        setAdminRole:builder.mutation<BaseResponse<boolean>,{idUser:number}>({
            query:(arg)=>({
                url:'user/setAdmin',
                method:'PUT',
                body:arg
            }),
            invalidatesTags:['User'],
        })
    }),
})
export const {
    useGetAllUsersQuery,
    useSetAdminRoleMutation,
} = userApi;