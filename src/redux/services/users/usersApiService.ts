import axios from "axios";
import { ErrorType } from "../../../types/Error.type";
import { apiService, baseURL } from "../emptySplitService/apiService";
import { UserResponse } from "../../../types/Users.type";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["User", "Users"],
});

export const usersApiSrevice = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1:getUserById
        getUserById: builder.query<UserResponse, number>({
            queryFn: async (id) => {
                try {
                    const {
                        data: { data },
                    } = await axios.get(`${baseURL}/users/${id}`);
                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            providesTags: ["User"],
        }),
        
    }),
});

export const { useGetUserByIdQuery } = usersApiSrevice;
