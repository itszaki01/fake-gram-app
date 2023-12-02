
export type CommentsResponse = {
        id: number;
        created_at: string;
        updated_at: string;
        body: string;
        is_fake: number;
        post_id: number;
        author_id: number;
};

export type CommentsRequest = {
    postID?: number;
    body: string;
};
