import { Container, Title } from "@mantine/core";
import PostCard from "../../components/PostCard/PostCard";
import MyLoader from "../../components/common/MyLoader/MyLoader";
import { useDevicesContext } from "../../contexts/DevicesContext";
import { useAppSelector } from "../../redux/app/hooks";
import { authSliceSelector } from "../../redux/feature/auth/authSlice";
import { useGetUserByIdQuery } from "../../redux/services/users/usersApiService";
import { useParams } from "react-router-dom";
import { useGetUserPostsQuery } from "../../redux/services/posts/postApiService";
import { ProfileCard } from "./components/ProfileCard";
import NewPostBtn from "../../components/common/ReponsiveNavBtns/NewPostBtn";
type params = {
    userID: string;
};
export default function Profile() {
    const { userID } = useParams<params>();
    const { isTabletAndMobile } = useDevicesContext();
    const { user: userProfile } = useAppSelector(authSliceSelector);
    const { data: userData, isLoading: isLoadingUser, isError: isUserError } = useGetUserByIdQuery(Number(userID));
    const { data: userPosts, isLoading: isLoadingUserPosts, isError: isPostsError } = useGetUserPostsQuery(Number(userID));

    if (isUserError || isPostsError) {
        return <h1>Error</h1>;
    } else if (isLoadingUser || isLoadingUserPosts) {
        return <MyLoader />;
    }

    return (
        <Container size={isTabletAndMobile ? "xl" : "sm"}>
            {userData && <ProfileCard userData={userData} />}

            <Title order={1} ta={"center"}>
                {userProfile.id == userData?.id ? "My Posts" : `@${userData?.username} Posts`}
            </Title>

            {userPosts && userPosts.length ? (
                userPosts?.map((post, i) => {
                    return <PostCard key={i} postData={post} />;
                })
            ) : (
                <>
                    <Title c={"gray.8"} mb={20} mt={20} ta={"center"}>
                        No Posts Yet
                    </Title>

                    <NewPostBtn />
                </>
            )}
        </Container>
    );
}
