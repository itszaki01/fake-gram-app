import { ActionIcon, Stack, TextInput, Title, UnstyledButton } from "@mantine/core";
import Comment from "./Comment";
import { useCreateCommentMutation } from "../../../redux/services/comments/commentsApiService";
import { IconMessage, IconPlus } from "@tabler/icons-react";
import { PostsGetType } from "../../../types/PostsTypes";
import { useState } from "react";
import { CommentsRequest, CommentsResponse } from "../../../types/Comments";
import { useInputState } from "@mantine/hooks";
import { toast } from "react-toastify";
type CommentsSectionProps = {
    postData: PostsGetType
    comments: CommentsResponse[];
};
export default function CommentsSection({ comments:commentsData,postData }: CommentsSectionProps) {

    const [commentsShowCount, setCommentsShowCount] = useState<number>(3);
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const [commentInput, setCommentInput] = useInputState("");

    const comments = commentsData?.map((data, i) => {
        return <Comment key={i} commentData={data} />;
    });

    function handleShowAllComments() {
        setCommentsShowCount(commentsData.length);
    }

    if (commentsData.length <= 3 && comments) {
        comments.length = commentsData.length;
    } else if (comments) {
        comments.length = commentsShowCount;
    }

    async function handleCreateCommentBtn() {
        const data: CommentsRequest = {
            postID: postData.id,
            body: commentInput,
        };
        try {
            await createComment(data).unwrap();
            toast.success("comment created");
            setCommentInput("");
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    }
    return (
        <Stack>
            {commentsData?.length == 0 ? (
                <>
                    <Title order={3} c={"gray.7"}>
                        No Comments Yet
                    </Title>
                    <TextInput
                        value={commentInput}
                        onChange={setCommentInput}
                        leftSection={<IconMessage />}
                        rightSection={
                            <ActionIcon loading={isLoading} radius={"xl"} onClick={handleCreateCommentBtn}>
                                <IconPlus />
                            </ActionIcon>
                        }
                        placeholder="... post a comment"
                        radius={"xl"}
                    ></TextInput>
                </>
            ) : (
                <>
                    <TextInput
                        value={commentInput}
                        onChange={setCommentInput}
                        leftSection={<IconMessage />}
                        rightSection={
                            <ActionIcon loading={isLoading} radius={"xl"} onClick={handleCreateCommentBtn}>
                                <IconPlus />
                            </ActionIcon>
                        }
                        placeholder="... post a comment"
                        radius={"xl"}
                    ></TextInput>
                    {comments}

                    {postData.comments_count > 3 && (
                        <UnstyledButton onClick={handleShowAllComments} c={"blue"}>
                            Show All... ({postData.comments_count <= 3 ? postData.comments_count : commentsShowCount}/{postData.comments_count})
                        </UnstyledButton>
                    )}
                </>
            )}
        </Stack>
    );
}
