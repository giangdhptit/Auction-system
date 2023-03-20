import {createSlice} from "@reduxjs/toolkit";
import {authApi} from "./auth.api";
import {User} from "../../model/user";

type AuthState = {
    user:User|null,
    token: string | null
}

const authSlice = createSlice({
    name: "auth",
    initialState: {user:null, token: null} as AuthState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, {payload}) => {
                state.user = payload.result.user;
                state.token = payload.result.token;
            }
        )
    },
});
// export const {setCredentials} = authSlice.actions;
export default authSlice.reducer;
// export const selectCurrentUser = (state: RootState) => state.auth.user;