import axios from "axios";
import { ErrorType } from "../../../types/Error.type";
import { apiService, baseURL } from "../emptySplitService/apiService";
import { CreatePostRequest, GetPostByIdResponse, PostsGetType, UpdatePostRequest } from "../../../types/PostsTypes";
import { store } from "../../app/store";

const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Post", "Posts"],
});

export const postApiSrevice = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1:getAllPost
        getAllPost: builder.query<PostsGetType[], { limit: number }>({
            queryFn: async ({ limit }) => {
                try {
                    const {
                        data: { data },
                    } = await axios.get<{ data: PostsGetType[] }>(`${baseURL}/posts?limit=${limit}`);
                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            providesTags: ["Posts"],
        }),
        //2:getPostByID
        getPostByID: builder.query<GetPostByIdResponse, string>({
            queryFn: async (id) => {
                const isAuth = store.getState().auth.isAuth;
                if (!isAuth) {
                    throw new Error("Please LogIn");
                }
                const headers = {
                    Authorization: `Bearer ${store.getState().auth.token}`,
                };
                try {
                    const {
                        data: { data },
                    } = await axios.get(`${baseURL}/posts/${Number(id)}`);

                    const {
                        data: { data: commentsData },
                    } = await axios.get(`${baseURL}/posts/${id}/comments`, { headers });
                    return {
                        data: {
                            postData: data,
                            comments: commentsData,
                        },
                    };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            providesTags: ["Post"],
        }),
        //3:getUserPosts
        getUserPosts: builder.query<PostsGetType[], number>({
            queryFn: async (id) => {
                try {
                    const {
                        data: { data },
                    } = await axios.get(`${baseURL}/users/${Number(id)}/posts`);
                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            providesTags: ["Posts"],
        }),
        //4:createPost
        createPost: builder.mutation<string, CreatePostRequest>({
            queryFn: async (postData) => {
                const form: Omit<CreatePostRequest, "image"> = {
                    title: postData.title,
                    body: postData.body,
                };
                const formData = new FormData();

                for (const key in postData) {
                    formData.append(key, postData[key as keyof typeof form]);
                }

                if (postData.image) {
                    formData.append("image", postData.image);
                    console.log("image");
                }

                try {
                    const headers = {
                        Authorization: `Bearer ${store.getState().auth.token}`,
                    };

                    await axios.post(`${baseURL}/posts`, postData.image ? formData : form, { headers });
                    return { data: "ok" };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            invalidatesTags: ["Posts"],
        }),
        //5:updatePost
        updatePost: builder.mutation<string, UpdatePostRequest>({
            queryFn: async (postData) => {
                try {
                    const updatedData = {
                        body: postData.body,
                    };
                    const headers = {
                        Authorization: `Bearer ${store.getState().auth.token}`,
                    };

                    await axios.put(`${baseURL}/posts/${postData.postID}`, updatedData, { headers });
                    return { data: "ok" };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            invalidatesTags: ["Post", "Posts"],
        }),
        //6:deletePost
        deletePost: builder.mutation({
            queryFn: async (id) => {
                try {
                    const headers = {
                        Authorization: `Bearer ${store.getState().auth.token}`,
                    };
                    await axios.delete(`${baseURL}/posts/${id}`, { headers });
                    return { data: "ok" };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            invalidatesTags: ["Posts"],
        }),
    }),
});

export const { useGetAllPostQuery, useGetPostByIDQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation, useGetUserPostsQuery } =
    postApiSrevice;
