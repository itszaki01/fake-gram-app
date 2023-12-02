import axios from "axios";
import { ErrorType } from "../../../types/Error.type";
import { apiService, baseURL } from "../emptySplitService/apiService";
import { SignUpResponse, SignUpRequset, LoginRequest, LoginResponse } from "../../../types/Auth";
const authApiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Profiel"],
});
export const authApiService = authApiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1: SignIn
        signIn: builder.mutation<LoginResponse, LoginRequest>({
            queryFn: async (loginData: LoginRequest) => {
                try {
                    const { data } = await axios.post(`${baseURL}/login`, loginData);
                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
        }),
        //2:SignUp
        signUp: builder.mutation<SignUpResponse, SignUpRequset>({
            queryFn: async (userData: SignUpRequset) => {
                try {
                    const form: Omit<SignUpRequset, "confirmPassword" | "image"> = {
                        email: userData.email,
                        password: userData.password,
                        username: userData.username,
                        name: userData.name,
                    };

                    const formData = new FormData();
                    for (const key in form) {
                        formData.append(key, form[key as keyof typeof form]);
                    }

                    if (userData.image) {
                        formData.append("image", userData.image);
                    }
                    console.log("called");

                    const { data } = await axios.post(`${baseURL}/register`, formData);
                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = authApiService;
