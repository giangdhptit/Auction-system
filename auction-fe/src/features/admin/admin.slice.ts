import {createSlice} from "@reduxjs/toolkit";
import {User} from "../../model/user";
import {adminApi} from "./admin.api";

type AuthState = {
    user:User|null,
    token: string | null
}

const adminSlice = createSlice({
    name: "auth",
    initialState: {user:null, token: null} as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            adminApi.endpoints.adminLogin.matchFulfilled,
            (state, {payload}) => {
                state.user = payload.result.user;
                state.token = payload.result.token;
            }
        )
    },
});
// export const {setCredentials} = authSlice.actions;
export default adminSlice.reducer;
// export const selectCurrentUser = (state: RootState) => state.auth.user;