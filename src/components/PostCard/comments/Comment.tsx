import { Stack, Divider, Text } from "@mantine/core";
import CommentAuthorAvatar from "./CommentAuthorAvatar";
import { CommentsResponse } from "../../../types/Comments";
type CommentProps = {
    commentData: CommentsResponse;
};
export default function Comment({ commentData }: CommentProps) {
    return (
        <Stack gap={5} bg={"gray.2"} style={{ borderRadius: 5 }} p={5}>
            <CommentAuthorAvatar commentData={commentData}/>
            <Divider />
            <Text size="xs">
                {commentData.body}
            </Text>
        </Stack>
    );
}
