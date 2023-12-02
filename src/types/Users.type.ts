export type UserResponse = {
    username: string;
    name: string;
    email: string;
    id: number;
    profile_image: string | undefined;
    comments_count: number;
    posts_count: number;
};
