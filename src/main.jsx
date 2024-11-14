import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import { store } from "./app/store";
import { postsSlice } from "./app/redux/postsSlice";
import { getUsers } from "./app/redux/usersSlice";

store.dispatch(postsSlice.endpoints.getPosts.initiate());
store.dispatch(getUsers());

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
