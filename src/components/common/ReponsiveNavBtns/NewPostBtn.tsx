import { Button, Group } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useModalsContext } from "../../../contexts/ModalsContext";

export default function NewPostBtn() {
    const { openCreatePostModal } = useModalsContext();
    function handleCreatePostClick() {
        openCreatePostModal()
    }
    return (
       <Group justify="center">
         <Button leftSection={<IconPlus />} onClick={handleCreatePostClick}>
            Create Post
        </Button>
       </Group>
    );
}
