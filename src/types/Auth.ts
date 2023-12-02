export type SignUpRequset = {
    username: string;
    password: string;
    confirmPassword: string;
    email: string;
    name: string;
    image?: File | null;
};

export type SignUpResponse = {
    user: {
        username: string;
        name: string;
        email: string;
        id: number | null;
        profile_image: string | undefined;
        comments_count: number | null;
        posts_count: number | null;
    };
    token: string;
};

export type LoginRequest = {
    username:string,
    password:string
}

export type LoginResponse = SignUpResponse


export type UpdateProfileRequest = {
    username:string,
    password: string
}
