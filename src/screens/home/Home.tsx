import {  Container } from "@mantine/core";
import PostCard from "../../components/PostCard/PostCard";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { useGetAllPostQuery } from "../../redux/services/posts/postApiService";
import {  useState } from "react";
import MyLoader from "../../components/common/MyLoader/MyLoader";
import useScrollTargetCallback from "../../hooks/useScrollTargetCallback";
import { useAppSelector } from "../../redux/app/hooks";
import { authSliceSelector } from "../../redux/feature/auth/authSlice";
import NewPostBtn from "../../components/common/ReponsiveNavBtns/NewPostBtn";

export default function Home() {
    const { isTabletAndMobile } = useDevicesContext();
    const [limit, setLimit] = useState<number>(20);
    const { isAuth } = useAppSelector(authSliceSelector);
    const { data, isLoading, isError, isFetching } = useGetAllPostQuery({ limit });

    //Pagination
    useScrollTargetCallback(scrollTargeCallbackFunc);
    function scrollTargeCallbackFunc() {
        setLimit((c) => c + 20);
    }

    return (
        <>
            <Container size={isTabletAndMobile ? "xl" : "sm"}>
                {isError && (
                    <>
                        <h1>Error</h1>
                    </>
                )}
                {isLoading ? (
                    <MyLoader />
                ) : (
                    <>
                        {isAuth && <NewPostBtn />}
                        {data?.map((post, i) => {
                            return <PostCard key={i} postData={post} />;
                        })}
                    </>
                )}
                {isFetching && !isLoading && <MyLoader />}
            </Container>
        </>
    );
}
