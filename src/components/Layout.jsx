import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
    return (
        <main className="w-full min-h-screen flex flex-col">
            <Header />
            <div className="flex-1 w-full h-full flex justify-center items-center">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
};

export default Layout;
