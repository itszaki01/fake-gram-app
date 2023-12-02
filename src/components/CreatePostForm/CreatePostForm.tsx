import { Button, Stack, TextInput, Textarea } from "@mantine/core";
import "./CreatePostForm.scss";
import PostImageDropZone from "./PostImageDropZone/PostImageDropZone";
import { useForm } from "react-hook-form";
import { CreatePostRequest } from "../../types/PostsTypes";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreatePostMutation } from "../../redux/services/posts/postApiService";
import { toast } from "react-toastify";
import { useModalsContext } from "../../contexts/ModalsContext";

const CreatePostFromSchema = yup.object().shape({
    title: yup.string().required("This field is required").min(15).max(90),
    body: yup.string().required("This field is required"),
});

export default function CreatePostForm() {
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm<CreatePostRequest>({
        mode: "all",
        defaultValues: {
            image: null,
        },
        resolver: yupResolver(CreatePostFromSchema),
    });

    const [CreatePost, { isLoading }] = useCreatePostMutation();
    const { closeCreatePostModal } = useModalsContext();

    const onSubmit = async (data: CreatePostRequest) => {
        try {
            await CreatePost(data).unwrap();
            toast.success("Post Created Successfuly");
            closeCreatePostModal();
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    };

    return (
        <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
            <Stack>
                <TextInput error={errors?.title?.message} {...register("title")} label="Post title" placeholder="write a subject ..." />
                <Textarea error={errors?.body?.message} {...register("body")} label="Post body" placeholder="write somthing ..." />
                <PostImageDropZone register={register} setValue={setValue} />
                <Button type="submit" loading={isLoading} fullWidth>
                    Create
                </Button>
            </Stack>
        </form>
    );
}
