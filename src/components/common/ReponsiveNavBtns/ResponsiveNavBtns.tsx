import { Button, Flex } from "@mantine/core";
import { IconHome, IconUserSquareRounded, IconUserCircle } from "@tabler/icons-react";
import LoginBtn from "./LoginBtn";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useAppSelector } from "../../../redux/app/hooks";
import { authSliceSelector } from "../../../redux/feature/auth/authSlice";
import { useModalsContext } from "../../../contexts/ModalsContext";
import { useNavigate } from "react-router-dom";
type Props = {
    close?: () => void;
};
export default function ResponsiveNavBtns({ close }: Props) {
    const { isAuth, user: userProfile } = useAppSelector(authSliceSelector);
    const { isMobile, isTablet } = useDevicesContext();
    const { openRegisterModal,openLoginModal } = useModalsContext();
    const navigate = useNavigate();

    function handleLoginBtnClick(){
        openLoginModal()
        if(close){
            close()
        }
    }

    function handleRegisterBtnClick() {
        if(close){
            close()
        }
        openRegisterModal();
    }

    function handleHomClick(){
        navigate('/')
        if(close){
            close()
        }
    }

    function handleProfileick(){
        navigate(`/profile/${userProfile.id}`)
        if(close){
            close()
        }
    }

    if (!isAuth) {
        return (
            <>
                <Flex direction={isMobile || isTablet ? "column" : "row"} gap={5}>
                    <LoginBtn handleLoginBtnClick={handleLoginBtnClick}/>
                    <Button leftSection={<IconUserCircle fontSize={50} />} onClick={handleRegisterBtnClick} variant="light">
                        Register
                    </Button>
                </Flex>
            </>
        );
    }

    return (
        <>
            <Flex direction={isMobile || isTablet ? "column" : "row"} gap={5}>
                <Button onClick={handleHomClick} leftSection={<IconHome fontSize={50} />} fullWidth variant="light" justify="">
                    Home
                </Button>
                <Button
                    onClick={handleProfileick}
                    leftSection={<IconUserSquareRounded fontSize={50} />}
                    fullWidth
                    variant="light"
                >
                    Profile
                </Button>
            </Flex>
        </>
    );
}
