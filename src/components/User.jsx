import React from "react";

const User = ({ user }) => {
    return (
        <article className="w-full border-4 border-solid border-blue-800 bg-gradient-to-bl from-slate-400 to-gray-300 rounded-2xl m-2 p-4 dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-950 flex-1">
            <div className="flex gap-6 items-center xs:flex-col">
                <img
                    src="/imgs/profile.svg"
                    alt={user.username}
                    className="w-40 h-40 object-contain"
                />
                <div className="flex flex-col">
                    <h2 className="title font-bold text-2xl">{user.name}</h2>
                    <span className="text-gray-600 text-sm dark:text-gray-400">
                        @ {user.username}
                    </span>
                    <div className="mt-2">
                        <p>Phone: {user.phone}</p>
                        <p>Email: {user.email}</p>
                        <p>Website: {user.website}</p>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default User;
