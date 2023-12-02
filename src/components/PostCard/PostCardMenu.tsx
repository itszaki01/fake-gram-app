import { Menu, ActionIcon, rem } from "@mantine/core";
import { IconDots, IconTrash, IconEdit } from "@tabler/icons-react";
import { useDeletePostMutation } from "../../redux/services/posts/postApiService";
import { toast } from "react-toastify";
import { PostsGetType } from "../../types/PostsTypes";
import { authSliceSelector } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/app/hooks";
import { useModalsContext } from "../../contexts/ModalsContext";
type PostCardMenuProps = {
    postData: PostsGetType;
};
export default function PostCardMenu({ postData }: PostCardMenuProps) {
    const [deletePost] = useDeletePostMutation();
    const { openUpdatePostModal,setPostUpdateID } = useModalsContext();
    const { isAuth, user: userProfile } = useAppSelector(authSliceSelector);
    
    async function handleDeletePostClick() {
        try {
            await deletePost(postData.id).unwrap();
            toast.success("Post Deleted Successfuly");
        } catch (error) {
            const _error = error as { message: string };
            console.log(_error);
            toast.error(_error.message);
        }
    }

    function handleUpdatePostClick() {
        setPostUpdateID(postData.id)
        openUpdatePostModal()
    }
    if (!isAuth || userProfile.id != postData.author.id) {
        return <></>;
    }

    return (
        <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
                <ActionIcon variant="subtle" color="gray">
                    <IconDots style={{ width: rem(16), height: rem(16) }} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item onClick={handleUpdatePostClick} leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
                    Edit Post
                </Menu.Item>
                <Menu.Item onClick={handleDeletePostClick} leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} color="red">
                    Delete Post
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
