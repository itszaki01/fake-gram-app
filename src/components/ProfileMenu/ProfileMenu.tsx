import { Avatar, Group, Menu, Stack, Text, UnstyledButton, rem } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { SignOut, authSliceSelector } from "../../redux/feature/auth/authSlice";

export default function ProfileMenu() {
    const { isXsMobile } = useDevicesContext();
    const { user } = useAppSelector(authSliceSelector);
    const dispatch = useAppDispatch();
    return (
        <Group h="100%" gap={4} style={{ overflow: "hidden" }} wrap="nowrap">
            <Stack gap={0} justify="flex-end" style={{ textAlign: "right" }} w={isXsMobile ? 70 : 100}>
                <Text size="sm" style={{ fontWeight: "bold" }}>
                    {user.username}
                </Text>
                {isXsMobile ? (
                    <Text fz={10} truncate="end">
                        {user.email}
                    </Text>
                ) : (
                    <Text size="xs" truncate="end">
                        {user.email}
                    </Text>
                )}
            </Stack>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <UnstyledButton>
                        <Avatar src={user?.profile_image} alt="no image here" />
                    </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        onClick={() => dispatch(SignOut())}
                        color="red"
                        leftSection={<IconLogout style={{ width: rem(50), height: rem(14) }} />}
                    >
                        Logout
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}
