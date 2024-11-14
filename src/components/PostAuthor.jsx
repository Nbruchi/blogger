import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../app/redux/usersSlice";
import { Link } from "react-router-dom";

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers);
    const author = users.find((user) => user.id === userId);

    return (
        <p className="flex items-center gap-1">
            <span className="text-lg">by</span>
            {author ? (
                <Link to={`/users/${userId}`}>
                    <span className="text-blue-600 text-lg dark:text-[#00f7ff]">
                        {author.name}
                    </span>
                </Link>
            ) : (
                "Unknown author"
            )}
        </p>
    );
};

export default PostAuthor;
