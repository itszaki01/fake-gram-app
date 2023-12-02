import { Avatar, Group, Stack, Text } from "@mantine/core";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { PostsGetType } from "../../types/PostsTypes";
import { Link } from "react-router-dom";
type PostCardAuthorAvatarProps = {
    postData:PostsGetType
}
export default function PostCardAuthorAvatar({postData}:PostCardAuthorAvatarProps) {
    const { isXsMobile } = useDevicesContext();
    return (
        <Group gap={5} justify="flex-end" style={{ textAlign: "left" }}>
            <Avatar to={`/profile/${postData.author.id}`} component={Link} src={postData.author.profile_image} alt="no image here"  style={{boxShadow:'0px 0px 1px 1px rgba(0,0,0,0.3)'}}/>
            <Stack gap={0}>
                <Text to={`/profile/${postData.author.id}`} component={Link} size="sm" style={{ fontWeight: "bold" }}>
                    @{postData.author.username}
                </Text>
                {isXsMobile ? <Text fz={10}>{postData.created_at}</Text> : <Text size="xs">{postData.created_at}</Text>}
            </Stack>
        </Group>
    );
}
