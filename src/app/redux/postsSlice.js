import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { sub } from "date-fns";

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const postsSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
    tagTypes: ["Post"],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => "/posts",
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                        };
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                { type: "Post", id: "LIST" },
                ...result.ids.map((id) => ({ type: "Post", id })),
            ],
        }),
        getPostsByUserId: builder.query({
            query: (id) => `/posts/?userId=${id}`,
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                        };
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                return [...result.ids.map((id) => ({ type: "Post", id }))];
            },
        }),
        createPost: builder.mutation({
            query: (initialPost) => ({
                url: "/posts",
                method: "POST",
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                    },
                },
            }),
            invalidatesTags: [{ type: "Post", id: "LIST" }],
        }),
        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: `/posts/${initialPost.id}`,
                method: "PUT",
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: "DELETE",
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Post", id: arg.id },
            ],
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `/posts/${postId}`,
                method: "PATCH",
                // in a real app, we'd probably need to base this on user Id somehow so that a user can't do the same reaction more than once
                body: { reactions },
            }),
            async onQueryStarted(
                { postId, reactions },
                { dispatch, queryFulfilled }
            ) {
                // updateQueryData requires the endpoint name and cache key arguments, so it knows which piece of cache state to update
                const patchResult = dispatch(
                    postsSlice.util.updateQueryData(
                        `getPosts`,
                        undefined,
                        (draft) => {
                            // The draft is immer-wrapped and can be mutated like in createSlice
                            const post = draft.entities[postId];
                            if (post) post.reactions = reactions;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,
} = postsSlice;

// returns the query result object
export const selectPostsResult = postsSlice.endpoints.getPosts.select();

// creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    (postsResults) => postsResults.data // normalized state object with ids& entities
);

// getSelectors creates these selectors and we rename them with aliases useing descructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds,
} = postsAdapter.getSelectors(
    (state) => selectPostsData(state) ?? initialState
);
