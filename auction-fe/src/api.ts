import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootState} from "./store";
import {STATIC_URL} from "./config/url_config";

export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({
        baseUrl: STATIC_URL,
        prepareHeaders: (headers, { getState }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = (getState() as RootState).auth.token || (getState() as RootState).authAdmin.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers
        },
        credentials: 'include',
    }),
    tagTypes: ['User','Item','Auction'],
    endpoints: () => ({}),
});