import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode, createContext, useContext, useState } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import LoginForm from "../components/LoginForm/LoginForm";
import CreatePostForm from "../components/CreatePostForm/CreatePostForm";
import UpdatePostForm from "../components/UpdatePostForm/UpdatePostForm";

type ModalsContextProps = {
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openRegisterModal: () => void;
    closeRegisterModal: () => void;
    openCreatePostModal: () => void;
    closeCreatePostModal: () => void;
    openUpdatePostModal: () => void;
    closeUpdatePostModal: () => void;
    setPostUpdateID: React.Dispatch<React.SetStateAction<number | null>>;
    postUpdateID: number | null;
};

const ModalsContext = createContext<ModalsContextProps>({} as ModalsContextProps);

export default function ModalsContextProvider({ children }: { children: ReactNode }) {
    const [LoginModalOpened, { open: openLoginModal, close: closeLoginModal }] = useDisclosure(false);
    const [RegisterModalOpened, { open: openRegisterModal, close: closeRegisterModal }] = useDisclosure(false);
    const [CreatePostModalOpened, { open: openCreatePostModal, close: closeCreatePostModal }] = useDisclosure(false);
    const [UpdatePostModalOpened, { open: openUpdatePostModal, close: closeUpdatePostModal }] = useDisclosure(false);

    const [postUpdateID, setPostUpdateID] = useState<number | null>(null);
    return (
        <ModalsContext.Provider
            value={{
                openLoginModal,
                closeLoginModal,
                openRegisterModal,
                closeRegisterModal,
                openCreatePostModal,
                closeCreatePostModal,
                openUpdatePostModal,
                closeUpdatePostModal,
                postUpdateID,
                setPostUpdateID,
            }}
        >
            {/* LoginModal */}
            <Modal opened={LoginModalOpened} onClose={closeLoginModal} title="Login" lockScroll={false}>
                <LoginForm />
            </Modal>

            {/* Register Modal */}
            <Modal opened={RegisterModalOpened} onClose={closeRegisterModal} title="Register ..." lockScroll={false}>
                <RegisterForm />
            </Modal>

            {/* Create Post Modal */}
            <Modal opened={CreatePostModalOpened} onClose={closeCreatePostModal} title="Create Post ..." lockScroll={false}>
                <CreatePostForm />
            </Modal>

            {/* Update Post Modal */}
            <Modal opened={UpdatePostModalOpened} onClose={closeUpdatePostModal} title="Update Post ..." lockScroll={false}>
                <UpdatePostForm />
            </Modal>

        
            {children}
        </ModalsContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useModalsContext = () => useContext(ModalsContext);
