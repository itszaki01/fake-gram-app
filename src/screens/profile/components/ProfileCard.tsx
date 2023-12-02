import { Card, Avatar, Text, Group } from "@mantine/core";
import { UserResponse } from "../../../types/Users.type";
import { IconAt } from "@tabler/icons-react";
import { useAppSelector } from "../../../redux/app/hooks";
import { authSliceSelector } from "../../../redux/feature/auth/authSlice";
// import classes from './UserCardImage.module.css';

type ProfileCarsProps = {
    userData: UserResponse;
};

export function ProfileCard({ userData }: ProfileCarsProps) {
    const stats = [{ value: userData.posts_count, label: "Posts" }];
    const { user: userProfile } = useAppSelector(authSliceSelector);

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text ta="center" fz="lg" fw={500}>
                {stat.value}
            </Text>
            <Text ta="center" fz="sm" c="dimmed" lh={1}>
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <Card withBorder padding="xl" radius="md" mb={20}>
            <Avatar src={userData.profile_image} size={80} radius={80} mx="auto" mt={-30} />
            <Text ta="center" fz="lg" fw={500} mt="sm">
                {userData.name}
            </Text>
            <Text ta={"center"} size="xs">
                @{userData.username}
            </Text>
            {userData.id == userProfile.id && (
                <Group wrap="nowrap" gap={1} mt={3} justify="center">
                    <IconAt stroke={1.5} size="1rem" color="gray" />
                    <Text fz="xs" c="dimmed">
                        {userProfile.email}
                    </Text>
                </Group>
            )}
            <Group mt="md" justify="center" gap={30}>
                {items}
            </Group>
        </Card>
    );
}
