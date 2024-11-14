import React from "react";
import { useSelector } from "react-redux";
import { selectPostIds, useGetPostsQuery } from "../app/redux/postsSlice";
import Loader from "../components/Loader";
import Postcard from "../components/Postcard";
import Wrapper from "../Wrapper/Wrapper";

const Home = () => {
    const orderedPostIds = useSelector(selectPostIds);
    const { isLoading, isSuccess, isError, error } = useGetPostsQuery();

    let content;
    if (isLoading) {
        content = (
            <div>
                <Loader />
            </div>
        );
    } else if (isSuccess) {
        content = (
            <>
                {orderedPostIds.length < 1 ? (
                    <div className="mt-20 flex items-center justify-center">
                        <h2 className="text-4xl title">No posts yet!</h2>
                    </div>
                ) : (
                    <div className="flex flex-col w-full items-center p-2 gap-4">
                        <h2 className="title text-2xl font-bold">
                            All posts ({orderedPostIds.length})
                        </h2>
                        <ul className="flex flex-wrap items-center justify-center p-2 gap-4">
                            {orderedPostIds.map((postId) => (
                                <Postcard key={postId} postId={postId} />
                            ))}
                        </ul>
                    </div>
                )}
            </>
        );
    } else if (isError) {
        content = <p className="text-red-600">{error}</p>;
    }

    return (
        <Wrapper title="Home">
            <section className="w-full h-full">{content}</section>
        </Wrapper>
    );
};

export default Home;
