import { Card, Group, Text, Image, Stack, Title, Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";
import DefaultPostImage from "../../assets/default_image.png";
import PostCardAuthorAvatar from "./PostCardAuthorAvatar";
import { PostsGetType } from "../../types/PostsTypes";
import { useLocation, useNavigate } from "react-router-dom";
import CommentsSection from "./comments/CommentsSection";
import { CommentsResponse } from "../../types/Comments";
import PostCardMenu from "./PostCardMenu";
type PostCardProps = {
    postData: PostsGetType;
    comments?: CommentsResponse[]
};
export default function PostCard({ postData,comments }: PostCardProps) {
    const navigation = useNavigate();
    const { pathname } = useLocation();
    const inPostViewPath = pathname.startsWith("/post/");

    return (
        <Card withBorder shadow="sm" radius="md" my={10}>
            {/* CARD-HEADER */}
            <Card.Section withBorder inheritPadding py="xs">
                <Group justify="space-between">
                    <PostCardAuthorAvatar postData={postData} />
                    <PostCardMenu postData={postData}/>
                </Group>
            </Card.Section>
            <Title order={2}>{postData.title}</Title>{" "}
            <Text mt="sm" c="gray.7" size="md" lineClamp={2}>
                {postData.body}
            </Text>
            {/* IMAGE */}
            <Card.Section mt="sm" mah={500} style={{ overflow: "hidden" }}>
                <Image fallbackSrc={DefaultPostImage} src={postData.image} w={"100%"} />
            </Card.Section>
            {/* CARD-FOOTER */}
            <Card.Section component={Stack} inheritPadding mt="sm" pb="md">
                <Text>Comments ({postData.comments_count}) </Text>

                {/* COMMENTS SECTION */}
                {!inPostViewPath ? (
                    <Button onClick={() => navigation(`/post/${postData.id}`)}>
                        <IconEye /> View Post
                    </Button>
                ) : (
                    comments && <CommentsSection comments={comments} postData={postData} />
                )}
            </Card.Section>
        </Card>
    );
}
