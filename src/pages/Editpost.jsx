import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectPostById, useUpdatePostMutation } from "../app/redux/postsSlice";
import { selectAllUsers } from "../app/redux/usersSlice";
import { useSelector } from "react-redux";
import Wrapper from "../Wrapper/Wrapper";
import { toast } from "react-toastify";

const Editpost = () => {
    const { id } = useParams();
    const [updatePost, { isLoading }] = useUpdatePostMutation();

    const post = useSelector((state) => selectPostById(state, Number(id)));
    const users = useSelector(selectAllUsers);
    const navigate = useNavigate();

    if (!post) {
        return (
            <Wrapper title="Post Not Found">
                <div className="flex items-center flex-col justify-center m-4 gap-8">
                    <h2 className="title text-2xl">Post not found!</h2>
                    <Link
                        to={`/post/${post.id}`}
                        className="border border-white border-solid rounded-lg p-4 w-60 flex items-center justify-center bg-indigo-600"
                    >
                        <img src="/imgs/back.svg" alt="backward" />
                    </Link>
                </div>
            </Wrapper>
        );
    }

    const [title, setTitle] = useState(post?.title);
    const [content, setContent] = useState(post?.content);
    const [userId, setUserId] = useState(post?.userId);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                await updatePost({
                    id: post.id,
                    title,
                    content,
                    userId,
                }).unwrap();
                setTitle("");
                setContent("");
                setUserId("");
                toast.success(`Post ${post.id} updated!`);
                navigate(`/post/${id}`);
            } catch (error) {
                toast.error(`Can't update post ${id}`);
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <Wrapper title={`Edit post ${post.id}`} className="p-4">
            <article className="w-full h-full flex items-center justify-start mt-8 flex-col gap-4 ">
                <h2 className="text-4xl title">Edit post</h2>
                <form
                    onSubmit={handleSubmit}
                    className="gap-4 flex items-start justify-start py-4 px-8 flex-col rounded-xl w-1/2 xs:w-full bg-[#ddd] dark:bg-[#333]"
                >
                    <div className="w-full gap-4">
                        <label htmlFor="postTitle" className="text-lg">
                            Edit Title:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                            className="border-2 dark:border-gray-100 border-gray-600 border-solid rounded-lg p-2 text-black w-full outline-none dark:bg-[#242424] dark:text-white"
                            autoFocus
                        />
                    </div>
                    <div className="w-full gap-4">
                        <label htmlFor="postAuthor" className="text-lg">
                            Edit Author:
                        </label>
                        <select
                            name="postAuthor"
                            id="PostAuthor"
                            value={userId}
                            onChange={onAuthorChange}
                            className="border-2 dark:border-gray-100 border-gray-600 border-solid rounded-lg p-2 text-black w-full outline-none dark:bg-[#242424] dark:text-white"
                        >
                            <option></option>
                            {usersOptions}
                        </select>
                    </div>
                    <div className="w-full gap-4">
                        <label htmlFor="postContent" className="text-lg">
                            Edit Content:
                        </label>
                        <textarea
                            name="postContent"
                            id="postContent"
                            rows={6}
                            value={content}
                            onChange={onContentChange}
                            className="border-2 dark:border-gray-100 border-gray-600 border-solid rounded-lg p-2 text-black w-full outline-none dark:bg-[#242424] dark:text-white resize-none"
                        ></textarea>
                    </div>
                    <div className="w-full gap-4 flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={!canSave}
                            className="w-full bg-emerald-600 p-4 rounded-xl text-xl disabled:bg-gray-400 text-white cursor-pointer disabled:text-gray-200"
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </article>
        </Wrapper>
    );
};

export default Editpost;
