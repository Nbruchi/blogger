import React from "react";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import {
    Addpost,
    Editpost,
    Home,
    Missing,
    Postpage,
    Userpage,
    Users,
} from "./pages";
import Layout from "./components/Layout";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/home" element={<Navigate to="/" />} />
                    <Route index element={<Home />} />
                    <Route path="post/">
                        <Route index element={<Addpost />} />
                        <Route path="edit/:id" element={<Editpost />} />
                        <Route path=":postId" element={<Postpage />} />
                    </Route>
                    <Route path="users/">
                        <Route index element={<Users />} />
                        <Route path=":userId" element={<Userpage />} />
                    </Route>
                    <Route path="*" element={<Missing />} />
                </Route>
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
};

export default App;
