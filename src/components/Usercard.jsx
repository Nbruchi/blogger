import React from "react";
import { useSelector } from "react-redux";
import { selectUserById } from "../app/redux/usersSlice";
import { Link } from "react-router-dom";

const Usercard = ({ userId }) => {
    const user = useSelector((state) => selectUserById(state, userId));

    return (
        <li className="grid-cols-3 xs:grid-cols-1 sm:grid-cols-2">
            <Link
                to={`/users/${user.id}`}
                className="py-4 px-8 border-4 border-solid border-blue-500 rounded-3xl flex  flex-col bg-gradient-to-t from-gray-200 to-gray-400 w-full dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-950 "
            >
                <div className="flex items-center gap-2 my-2">
                    <img src="/imgs/profile.svg" alt={user.username} />
                    <div className="flex flex-col">
                        <h4 className="text-blue-500 text-xl font-bold dark:text-[#00f7ff]">
                            {user.name}
                        </h4>
                        <span className="text-sm text-gray-600">
                            @ {user.username}
                        </span>
                    </div>
                </div>

                <p>
                    Phone:{" "}
                    <span className="text-emerald-500 font-bold">
                        {user.phone}
                    </span>
                </p>
                <p>
                    Email:{" "}
                    <span className="text-yellow-500 font-bold">
                        {user.email}
                    </span>
                </p>
            </Link>
        </li>
    );
};

export default Usercard;
