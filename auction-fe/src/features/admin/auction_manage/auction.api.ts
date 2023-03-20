import {appApi} from "../../../api";
import {BaseResponse} from "../../../model/user";
import {Auction} from "../../../model/auction";

export const auctionApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllAuctions: builder.query<BaseResponse<Auction[]>, void>({
            query: () => ({
                url: 'auction/getAllAuctions'
            }),
            providesTags: ['Auction'],
        }),
        addAuction: builder.mutation<BaseResponse<Auction>, { initPrice: number,timeStart:string,timeEnd:string,idUser:string,idItem:string }>({
            query: (arg) => ({
                url: 'auction/addAuction',
                method: "POST",
                body: arg
            }),
            invalidatesTags: ['Auction'],
        }),
        deleteAuction: builder.mutation<BaseResponse<boolean>, { idAuction:number }>({
            query: (arg) => ({
                url: 'auction/deleteAuction',
                method: "DELETE",
                body: arg
            }),
            invalidatesTags: ['Auction'],
        }),
    }),
})
export const {
    useGetAllAuctionsQuery,
    useAddAuctionMutation,
    useDeleteAuctionMutation
} = auctionApi;