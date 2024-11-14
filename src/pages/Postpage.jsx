import { toast } from "react-toastify";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaTrashAlt, FaRegEdit } from "react-icons/fa";

import {
    selectAllPosts,
    selectPostById,
    useDeletePostMutation,
} from "../app/redux/postsSlice";
import Wrapper from "../Wrapper/Wrapper";
import PostAuthor from "../components/PostAuthor";
import TimeAgo from "../components/TimeAgo";
import ReactionBtn from "../components/ReactionBtn";
import Postcard from "../components/Postcard";

const Postpage = () => {
    const { postId } = useParams();
    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const navigate = useNavigate();
    const [deletePost] = useDeletePostMutation();

    const unorderedPosts = useSelector((state) => selectAllPosts(state));
    const userPosts = unorderedPosts.filter(
        (userPost) => userPost.userId === post.userId
    );
    const relatedPosts = userPosts.filter(
        (relatedPost) => relatedPost.id !== post.id
    );

    if (!post) {
        return (
            <Wrapper
                title="Post Not Found"
                className="flex items-center justify-center flex-col p-4 gap-8"
            >
                <h2 className="title text-2xl">Post not found</h2>
                <Link
                    to="/"
                    className="border border-white border-solid rounded-lg p-4 w-60 flex items-center justify-center bg-indigo-700"
                >
                    <img src="/imgs/back.svg" alt="backward" />
                </Link>
            </Wrapper>
        );
    }

    const onDeletePost = async () => {
        try {
            await deletePost({ id: post.id }).unwrap();
            toast.success(`post ${post.id} deleted!`);
            navigate("/");
        } catch (error) {
            toast.error(`Can't delete post\n${error.message}`);
        }
    };

    return (
        <Wrapper title={post.title}>
            <div className="flex items-start justify-around p-4 w-full h-full md:flex-col md:gap-2">
                <article className="flex flex-col p-4 border-4 border-solid border-blue-600 rounded-xl gap-2 bg-gradient-to-b from-slate-300 to-gray-300 w-1/2 md:w-full  dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-950">
                    <h2 className="text-3xl text-indigo-700 dark:text-[#00f7ff] first-letter:uppercase">
                        {post.title}
                    </h2>
                    <p className="text-xl first-letter:uppercase">
                        {post.content}
                    </p>
                    <div className="flex gap-4 items-center xs:flex-col xs:items-start">
                        <PostAuthor userId={post.userId} />
                        <TimeAgo timestamp={post.date} />
                    </div>
                    <div className="flex w-full justify-start gap-4 items-center">
                        <Link
                            to={`/post/edit/${postId}`}
                            className="text-white bg-gradient-to-t from-indigo-700 to-indigo-500 py-1.5 px-8 rounded-lg text-center text-xl"
                        >
                            <FaRegEdit size={20} />
                        </Link>
                        <div className="flex gap-4 w-1/3">
                            <ReactionBtn post={post} />
                        </div>
                    </div>
                </article>
                <div className=" p-8 bg-blue-500 flex items-center flex-col justify-between w-1/3  gap-8 rounded-xl md:flex-row md:gap-4 md:w-full">
                    <button
                        onClick={onDeletePost}
                        className="bg-red-500 rounded-xl p-4 w-full flex items-center justify-center text-white font-semibold "
                    >
                        <FaTrashAlt size={20} />
                    </button>

                    <Link
                        to="/"
                        className="border border-white border-solid rounded-lg p-4 w-full flex items-center justify-center"
                    >
                        <img src="/imgs/back.svg" alt="backward" />
                    </Link>
                </div>
            </div>
            {relatedPosts && (
                <div className="mt-4 w-full p-4">
                    <h2 className="title text-2xl text-center">
                        {relatedPosts && "Related Posts"}({relatedPosts.length})
                    </h2>
                    <ul className="flex items-center justify-center flex-wrap p-4 gap-4">
                        {relatedPosts.map((post) => (
                            <Postcard key={post.id} postId={post.id} />
                        ))}
                    </ul>
                </div>
            )}
        </Wrapper>
    );
};

export default Postpage;
