import { Group, Avatar, Stack, Text, Skeleton } from "@mantine/core";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { CommentsResponse } from "../../../types/Comments";
import { useGetUserByIdQuery } from "../../../redux/services/users/usersApiService";
import moment from 'moment';

type CommentAuthorAvatarProps = {
    commentData: CommentsResponse;
};

export default function CommentAuthorAvatar({ commentData }: CommentAuthorAvatarProps) {
    const { isXsMobile } = useDevicesContext();
    const { data: authorData, isLoading: isLoadingAuthorData } = useGetUserByIdQuery(commentData.author_id);
    
    if (isLoadingAuthorData) {
        return (
            <Group gap={3}>
                <Skeleton circle height={30} />
                <Stack gap={3}>
                    <Skeleton height={10} width={150} />
                    <Skeleton height={10} width={150} />
                </Stack>
            </Group>
        );
    }
    return (
        <Group gap={5} justify="flex-start" style={{ textAlign: "left" }}>
            <Avatar size={"30px"} src={authorData?.profile_image} alt="no image here" />
            <Stack gap={0}>
                <Text fz={12} style={{ fontWeight: "bold" }}>
                    {authorData?.username}
                </Text>
                {isXsMobile ? <Text fz={12}>{moment(commentData.created_at).startOf('hour').fromNow()}</Text> : <Text fz={10}>{moment(commentData.created_at).startOf('hour').fromNow()}</Text>}
            </Stack>
        </Group>
    );
}
