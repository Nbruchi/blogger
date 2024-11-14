import { useSelector } from "react-redux";
import { selectUserById } from "../app/redux/usersSlice";
import { Link, useParams } from "react-router-dom";
import React from "react";

import { useGetPostsByUserIdQuery } from "../app/redux/postsSlice";
import User from "../components/User";
import Wrapper from "../Wrapper/Wrapper";
import Postcard from "../components/Postcard";

const Userpage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, userId));

    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsByUserIdQuery(userId);

    let content;
    if (isLoading) {
        content = <p>Loading...</p>;
    } else if (isSuccess) {
        const { ids, entities } = postsForUser;

        content = (
            <div className="p-6">
                <User user={user} />
                {ids.length < 1 ? (
                    <Wrapper
                        title="Post Not Found"
                        className="flex items-center justify-center flex-col p-4 gap-8"
                    >
                        <h2 className="title text-2xl">No User Posts found!</h2>
                        <Link
                            to="/users"
                            className="border border-white border-solid rounded-lg p-4 w-60 flex items-center justify-center bg-indigo-700"
                        >
                            <img src="/imgs/back.svg" alt="backward" />
                        </Link>
                    </Wrapper>
                ) : (
                    <div className="flex items-center w-full flex-col my-4 gap-4">
                        <h2 className="title text-3xl">
                            {user.name}'s Posts ({ids.length})
                        </h2>
                        <ul className="flex items-center justify-center flex-wrap p-4 gap-4">
                            {ids.map((id) => (
                                <Postcard key={id} postId={entities[id].id} />
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return (
        <Wrapper title={`User page`}>
            <div>{content}</div>
        </Wrapper>
    );
};

export default Userpage;
