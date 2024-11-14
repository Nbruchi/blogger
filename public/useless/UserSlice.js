import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => "/users",
            providesTags: (result, error, arg) => [
                { type: "User", id: "LIST" },
                ...result.map((item) => ({ type: "User", id: item.id })),
            ],
        }),
        createUser: builder.mutation({
            query: (initialUser) => ({
                url: "/users",
                method: "POST",
                body: {
                    ...initialUser,
                },
            }),
            invalidatesTags: [{ type: "User", id: "LIST" }],
        }),
        updateUser: builder.mutation({
            query: (initialUser) => ({
                url: `/users/${initialUser.id}`,
                method: "PUT",
                body: {
                    ...initialUser,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "User", id: arg.id },
            ],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersSlice;

// returns the query result object
export const selectUsersResult = usersSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    (usersResults) => usersResults.data // normalized state object with ids& entities
);

// getSelectors creates these selectors and we rename them with aliases useing descructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds,
} = usersAdapter.getSelectors(
    (state) => selectUsersData(state) ?? initialState
);
