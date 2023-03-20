import {appApi} from "../../api";
import {BaseResponse} from "../../model/user";
import {Auction} from "../../model/auction";

export const homeApi = appApi.injectEndpoints({
    endpoints: (builder) => ({
        getAuctionInProgress: builder.query<BaseResponse<Auction[]>, void>({
            query: () => ({
                url: 'auction/getAuctionInProgress'
            }),
        }),
    }),
})
export const {
    useGetAuctionInProgressQuery
} = homeApi;