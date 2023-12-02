import axios from "axios";
import { CommentsRequest, CommentsResponse } from "../../../types/Comments";
import { ErrorType } from "../../../types/Error.type";
import { apiService, baseURL } from "../emptySplitService/apiService";
import { store } from "../../app/store";
const apiServiceWithTags = apiService.enhanceEndpoints({
    addTagTypes: ["Comments", "Post"],
});

export const commentsApiService = apiServiceWithTags.injectEndpoints({
    endpoints: (builder) => ({
        //1:getCommentsByPostID
        getCommentsByPostID: builder.query<CommentsResponse[], number>({
            queryFn: async (id) => {
                try {
                    const headers = {
                        Authorization: `Bearer ${store.getState().auth.token}`,
                    };
                    const {
                        data: { data },
                    } = await axios.get(`${baseURL}/posts/${id}/comments`, { headers });

                    return { data };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            providesTags: ["Comments"],
        }),
        //2:createComment
        createComment: builder.mutation({
            queryFn: async (commentData: CommentsRequest) => {
                const commentBody = {
                    body: commentData.body,
                };
                const headers = {
                    Authorization: `Bearer ${store.getState().auth.token}`,
                };
                try {
                    await axios.post(`${baseURL}/posts/${commentData.postID}/comments`, commentBody, { headers });
                    return { data: "ok" };
                } catch (error) {
                    const _error = error as ErrorType;
                    console.log(_error);
                    throw new Error(_error.response.data.message);
                }
            },
            invalidatesTags: ["Comments", "Post"],
        }),
    }),
});

export const { useGetCommentsByPostIDQuery, useCreateCommentMutation } = commentsApiService;
