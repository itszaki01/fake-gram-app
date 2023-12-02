import { Button, LoadingOverlay, Stack, Textarea } from "@mantine/core";
import "./UpdatePostForm.scss";
import { useForm } from "react-hook-form";
import { CreatePostRequest, UpdatePostRequest } from "../../types/PostsTypes";
import { useGetPostByIDQuery, useUpdatePostMutation } from "../../redux/services/posts/postApiService";
import { toast } from "react-toastify";
import { useModalsContext } from "../../contexts/ModalsContext";
import { useEffect } from "react";

export default function UpdatePostForm() {
    const { postUpdateID, closeUpdatePostModal } = useModalsContext();
    const { data, isLoading } = useGetPostByIDQuery(String(postUpdateID));
    const [UpdatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
    } = useForm<CreatePostRequest>({
        mode: "all",
    });

    const onSubmit = async (data: CreatePostRequest) => {
        const updatedDate: UpdatePostRequest = {
            postID: postUpdateID,
            body: data.body,
        };

        try {
            await UpdatePost(updatedDate).unwrap();
            toast.success("Post Updated Successfuly");
            closeUpdatePostModal();
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    };

    useEffect(() => {
        data && setValue("body", data?.postData.body);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <LoadingOverlay visible={isLoading} />
                <Textarea error={errors?.body?.message} {...register("body",{
                    required: 'This Field is Requred',
                    minLength:{
                        value:5,
                        message:'must at least 5 characters'
                    }
                })} label="Post body" placeholder="write somthing ..." />
                <Button type="submit" loading={isUpdating} fullWidth>
                    Update post
                </Button>
            </Stack>
        </form>
    );
}
