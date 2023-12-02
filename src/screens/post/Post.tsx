import { useParams } from "react-router-dom";
import { useGetPostByIDQuery } from "../../redux/services/posts/postApiService";
import { useAppSelector } from "../../redux/app/hooks";
import { authSliceSelector } from "../../redux/feature/auth/authSlice";
import MyLoader from "../../components/common/MyLoader/MyLoader";
import { Container } from "@mantine/core";
import { useDevicesContext } from "../../contexts/DevicesContext";
import PostCard from "../../components/PostCard/PostCard";
import { Error } from "../error/Error";
type params = {
    postID: string;
};
export default function Post() {
    const { postID } = useParams<params>();
    const { isAuth } = useAppSelector(authSliceSelector);
    const { isTabletAndMobile } = useDevicesContext();
    const { data, isLoading, isError, isFetching } = useGetPostByIDQuery(postID ? postID : "0");
    if (!isAuth) {
        return <h1>Please Login</h1>;
    }
    return (
        <Container size={isTabletAndMobile ? "xl" : "sm"}>
            {isError && (
                <>
                    <Error />
                </>
            )}
            {isLoading ? <MyLoader /> : data && <PostCard postData={data.postData} comments={data.comments} />}
            {isFetching && !isLoading && <MyLoader />}
        </Container>
    );
}
