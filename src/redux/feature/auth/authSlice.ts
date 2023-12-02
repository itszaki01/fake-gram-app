import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { SignUpResponse } from "../../../types/Auth";
import { authApiService } from "../../services/auth/authApiService";
import { toast } from "react-toastify";

interface authSate extends SignUpResponse {
    isAuth: boolean;
}

const initialState: authSate = {
    user: {
        username: "",
        name: "",
        email: "",
        id: null,
        profile_image: "",
        comments_count: null,
        posts_count: null,
    },
    token: "",
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SignOut: () => {
            toast.success('Logged Out Successfuly')
            return {
                user: {
                    username: "",
                    name: "",
                    email: "",
                    id: null,
                    profile_image: "",
                    comments_count: null,
                    posts_count: null,
                },
                token: "",
                isAuth: false,
            };
        },
    },
    extraReducers(builder) {
        builder.addMatcher(authApiService.endpoints.signUp.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isAuth = true;
        });
        builder.addMatcher(authApiService.endpoints.signIn.matchFulfilled, (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isAuth = true;
        });
    },
});

export const authSliceSelector = (state: RootState) => state.auth;
export const { SignOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
