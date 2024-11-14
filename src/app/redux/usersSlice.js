import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://localhost:8000/users";

const initialState = [];

export const getUsers = createAsyncThunk("users/getUsers", async () => {
    try {
        const response = await axios.get(USERS_URL);
        return [...response.data];
    } catch (error) {
        return error.message;
    }
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectAllUsers = (state) => state.users;
export const selectUserById = (state, userId) =>
    state.users.find((user) => user.id === userId);
export default usersSlice.reducer;
