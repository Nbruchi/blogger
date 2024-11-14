import React from "react";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

import useTheme from "../hooks/useTheme";

const Header = () => {
    const [mode, setMode] = useTheme();

    return (
        <header className="flex w-full p-4 static items-center justify-around bg-gradient-to-t from-blue-800 to-blue-400 flex-1 z-20  xs:gap-2 max-h-20">
            <Link to="/">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-40 h-12 object-cover"
                />
            </Link>
            <nav>
                <ul className="flex gap-4 items-center text-white">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/post">Post</Link>
                    </li>
                    <li>
                        <Link to="/users">Authors</Link>
                    </li>
                    <li>
                        <button
                            onClick={() =>
                                setMode(mode === "light" ? "dark" : "light")
                            }
                            className={`ml-3 flex items-center justify-center rounded-full p-2 sm:mx-1 ${
                                mode === "light"
                                    ? "bg-black text-white"
                                    : "bg-white text-black"
                            }`}
                        >
                            {mode === "dark" ? (
                                <FaSun className="text-xl" />
                            ) : (
                                <FaMoon className="text-xl" />
                            )}
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
