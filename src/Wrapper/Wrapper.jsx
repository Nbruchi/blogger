import React from "react";

const Wrapper = ({ title, children, className }) => {
    document.title = `Blogger | ${title}`;

    return (
        <div
            className={`${className} bg-white text-gray-950 dark:bg-[#242424] dark:text-white flex-1 w-full h-full`}
        >
            {children}
        </div>
    );
};

export default Wrapper;
