import React from "react";
import { useSelector } from "react-redux";
import { selectPostById } from "../app/redux/postsSlice";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionBtn from "./ReactionBtn";

const Postcard = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));

    return (
        <li className="p-4 border-4 border-solid border-blue-500 rounded-xl flex  flex-col bg-gradient-to-b from-gray-200 to-gray-400 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-950">
            <h4 className="text-xl text-blue-800 dark:text-[#00f7ff] first-letter:uppercase">
                {post.title.length > 30
                    ? `${post.title.substring(0, 30)}...`
                    : post.title}
            </h4>
            <p className="text-lg first-letter:uppercase">
                {post.content.length > 30
                    ? `${post.content.substring(0, 30)}...`
                    : post.content}
            </p>
            <div className="flex items-center xs:items-start gap-4 xs:gap-1 my-2 xs:flex-col">
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </div>
            <div className="flex items-center  justify-between pr-8 w-full gap-4 ">
                <Link
                    to={`/post/${post.id}`}
                    className="py-1 px-4 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-900 text-white text-lg"
                >
                    <AiOutlineEye size={20} />
                </Link>
                <div className="flex gap-1 items-center">
                    <ReactionBtn post={post} />
                </div>
            </div>
        </li>
    );
};

export default Postcard;
