import {appApi} from "../../../api";
import {BaseResponse} from "../../../model/user";
import {Item} from "../../../model/item";

export const itemApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query<BaseResponse<Item[]>, void>({
            query: () => ({
                url: 'item/getAllItems'
            }),
            providesTags: ['Item'],
        }),
        addItem: builder.mutation<BaseResponse<Item>, { name: string, description: string, imageItem?: File | null }>({
            query(data) {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("description", data.description);
                if (data.imageItem) formData.append("imageItem", data?.imageItem);
                return {
                    url: 'item/addItem',
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ['Item'],
        }),
        updateItem: builder.mutation<BaseResponse<Item>, { id: number, name: string, description: string, imageItem?: File | null }>({
            query(data) {
                const formData = new FormData();
                formData.append("id", data.id.toString());
                formData.append("name", data.name);
                formData.append("description", data.description);
                if (data.imageItem) formData.append("imageItem", data?.imageItem);
                return {
                    url: 'item/updateItem',
                    method: "PUT",
                    body: formData
                }
            },
            invalidatesTags: ['Item'],
        }),
        deleteItem: builder.mutation<BaseResponse<boolean>, { item_id: number }>({
            query: (arg) => ({
                url: 'item/deleteItem',
                method: "DELETE",
                body: arg
            }),
            invalidatesTags: ['Item'],
        })
    }),
})
export const {
    useGetAllItemsQuery,
    useAddItemMutation,
    useUpdateItemMutation,
    useDeleteItemMutation,
} = itemApi;