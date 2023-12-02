import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseURL = "https://tarmeezacademy.com/api/v1";
// Api<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, {
//     signUp: MutationDefinition<SignUpRequset, BaseQueryFn<...>, never, SignUpResponse, "api">;
// }, "api", never, typeof coreModuleName | typeof reactHooksModuleName>

export const apiService = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://tarmeezacademy.com/api/v1" }),
    endpoints: () => ({}),
});
