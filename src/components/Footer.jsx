import React from "react";
import { selectAllPosts } from "../app/redux/postsSlice";
import { useSelector } from "react-redux";

const Footer = () => {
    const posts = useSelector(selectAllPosts);

    return (
        <footer className="flex flex-col items-center justify-center w-full static bottom-0 left-0 p-2 bg-gradient-to-t from-blue-800 to-blue-400 text-lg text-white mt-8">
            <h4>
                {posts.length} Post{posts.length < 1 ? "" : "s"}
            </h4>
            <div className="flex  items-center justify-center w-full">
                Copyright &copy;
                {new Date().getFullYear()}
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[60px] h-[20px] object-cover"
                />
            </div>
        </footer>
    );
};

export default Footer;
