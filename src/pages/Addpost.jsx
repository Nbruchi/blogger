import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useCreatePostMutation } from "../app/redux/postsSlice";
import { selectAllUsers } from "../app/redux/usersSlice";
import Wrapper from "../Wrapper/Wrapper";

const Addpost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState("");

    const [createPost, { isLoading }] = useCreatePostMutation();
    const navigate = useNavigate();
    const users = useSelector(selectAllUsers);

    const onTitleChange = (e) => setTitle(e.target.value);
    const onContentChange = (e) => setContent(e.target.value);
    const onAuthorChange = (e) => setUserId(Number(e.target.value));

    const canSave = [title, content, userId].every(Boolean) && !isLoading;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (canSave) {
            try {
                await createPost({ title, content, userId }).unwrap();
                setTitle("");
                setContent("");
                setUserId("");
                toast.success("Task created successfully!");
                navigate("/");
            } catch (error) {
                toast.error(`Failed to create post!\n${error.message}`);
            }
        }
    };

    const usersOption =
        users &&
        users.map((user) => (
            <option value={user.id} key={user.id}>
                {user.name}
            </option>
        ));

    return (
        <Wrapper title="Create post" className="p-4">
            <article className="w-full h-full flex items-center justify-start mt-8 flex-col gap-4">
                <h2 className="text-4xl title">Add a new post</h2>
                <form
                    onSubmit={handleSubmit}
                    className="gap-4 flex items-start justify-start py-4 px-8 flex-col rounded-xl w-1/2 xs:w-full bg-[#ddd] dark:bg-[#333]"
                >
                    <div className="w-full gap-2 flex flex-col">
                        <label htmlFor="postTitle" className="text-lg">
                            Post Title:
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
                            Post Author:
                        </label>
                        <select
                            name="postAuthor"
                            id="PostAuthor"
                            value={userId}
                            onChange={onAuthorChange}
                            className="border-2 dark:border-gray-100 border-gray-600 border-solid rounded-lg p-2 text-black w-full outline-none dark:bg-[#242424] dark:text-white"
                        >
                            <option></option>
                            {usersOption}
                        </select>
                    </div>
                    <div className="w-full gap-4">
                        <label htmlFor="postContent" className="text-lg">
                            Post Content:
                        </label>
                        <textarea
                            name="postContent"
                            id="postContent"
                            rows={6}
                            value={content}
                            onChange={onContentChange}
                            className="border-2 dark:border-gray-100 border-gray-600 border-solid rounded-lg p-2 text-black w-full outline-none resize-none dark:bg-[#242424] dark:text-white"
                        ></textarea>
                    </div>
                    <div className="w-full gap-4 flex items-center justify-center">
                        <button
                            type="submit"
                            disabled={!canSave}
                            className="w-full bg-emerald-600 p-4 rounded-xl text-xl disabled:bg-gray-400 text-white cursor-pointer disabled:text-gray-200"
                        >
                            {isLoading ? "Creating..." : "Create"}
                        </button>
                    </div>
                </form>
            </article>
        </Wrapper>
    );
};

export default Addpost;
