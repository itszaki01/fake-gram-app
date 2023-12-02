import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import Home from "../screens/home/Home";
import { AppShell, Container } from "@mantine/core";
import NavBar from "../components/common/NavBar/NavBar";
import ResponsiveNavBtns from "../components/common/ReponsiveNavBtns/ResponsiveNavBtns";
import { useDisclosure } from "@mantine/hooks";
import Post from "../screens/post/Post";
import Profile from "../screens/profile/Profile";
import AuthUserRoutes from "./AuthUserRoutes";
import { Error } from "../screens/error/Error";
export default function AppRouter() {
    const [opened, { toggle,close }] = useDisclosure();
    return (
        <>
            <BrowserRouter>
                <AppShell
                    header={{ height: 50 }}
                    navbar={{ width: 250, breakpoint: "sm", collapsed: { desktop: true, mobile: !opened } }}
                    padding="md"
                >
                    <AppShell.Header bg={"gray.2"}>
                        <Container h={"100%"}>
                            <NavBar opened={opened} toggle={toggle} />
                        </Container>
                    </AppShell.Header>

                    {/* MOBILE DRAWER */}
                    <AppShell.Navbar py="md" px={4} w={"80%"} hiddenFrom="sm">
                        <ResponsiveNavBtns close={close} />
                    </AppShell.Navbar>

                    <AppShell.Main px={5}>
                        <Routes>
                            <Route path={ROUTES.HOME} element={<Home />} />
                            <Route path={ROUTES.VIEW_POST} element={<Post />} />
                            <Route path={ROUTES.VIEW_PROFILE} element={<Profile />} />
                            <Route element={<AuthUserRoutes />}></Route>

                            {/* ERRO ROUTE */}
                            <Route path={'*'} element={<Error />} />
                        </Routes>
                    </AppShell.Main>
                </AppShell>
            </BrowserRouter>
        </>
    );
}
