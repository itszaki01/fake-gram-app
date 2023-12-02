import { CommentsResponse } from "./Comments";

export type PostsGetType = {
    id: number;
    title: string;
    body: string;
    author: {
        id: number;
        profile_image: string;
        is_fake: number;
        username: string;
        name: string;
        email: string;
        email_verified_at: string;
        remember_token: boolean;
        created_at: string;
        updated_at: string;
    };
    image: string;
    tags: string[];
    created_at: string;
    comments_count: number;
};

export type GetPostByIdResponse = {
    postData: PostsGetType;
    comments: CommentsResponse[];
};

export type CreatePostRequest = {
    title: string;
    body: string;
    image?: File | null;
};

export type UpdatePostRequest = {
    postID: number | null;
    body: string;
};
