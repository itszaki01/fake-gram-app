import { Burger, Group, Image, Title } from "@mantine/core";
import Logo from "../../../assets/logo.png";
import ResponsiveNavBtns from "../ReponsiveNavBtns/ResponsiveNavBtns";
import ProfileMenu from "../../ProfileMenu/ProfileMenu";
import LoginBtn from "../ReponsiveNavBtns/LoginBtn";
import { useDevicesContext } from "../../../contexts/DevicesContext";
import { useAppSelector } from "../../../redux/app/hooks";
import { authSliceSelector } from "../../../redux/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";
type NavBarPropsType = {
    opened: boolean;
    toggle: () => void;
};
export default function NavBar({ opened, toggle }: NavBarPropsType) {
    const { isMobile, isDesktop, isTabletAndMobile } = useDevicesContext();
    const { isAuth } = useAppSelector(authSliceSelector);
    const navigate = useNavigate()
    return (
        <Group h="100%" gap={0}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />

            <Group px={{ base: "xs", md: "md" }} justify="space-between" style={{ flex: 1}}>
                <Group onClick={()=> navigate('/')} style={{cursor:'pointer'}}>
                    <Image src={Logo} w={40} h={40} />
                    <Title order={isMobile ? 5 : 3} style={{ fontFamily: "Vegan Style Personal Use" }}>
                        FakeGram
                    </Title>
                </Group>

                {/*SHOW ONLY IN MOBILE => MOBILE=LOGIN BTN */}
                {isTabletAndMobile && !isAuth && <LoginBtn />}

                {/* NAV-BAR BUTTONS */}
                {isDesktop && <ResponsiveNavBtns />}

                {isAuth && (
                    <>
                        {/* PROFILE-MENU */}
                        <ProfileMenu />
                    </>
                )}
            </Group>
        </Group>
    );
}
