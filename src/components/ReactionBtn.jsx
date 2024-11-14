import React from "react";
import { useAddReactionMutation } from "../app/redux/postsSlice";

const reactionEmojis = {
    thumbsUp: "👍",
    wow: "😲",
    heart: "💖",
    rocket: "🚀",
};

const ReactionBtn = ({ post }) => {
    const [addReaction] = useAddReactionMutation();

    const reactionButtons = Object.entries(reactionEmojis).map(
        ([name, emoji]) => (
            <button
                key={name}
                onClick={() => {
                    const newValue = post.reactions[name] + 1;
                    addReaction({
                        postId: post.id,
                        reactions: {
                            ...post.reactions,
                            [name]: newValue,
                        },
                    });
                }}
            >
                <div className="flex gap-1 border-2 border-solid border-indigo-500 dark:border-[#00f7ff] rounded-md px-1 items-center justify-center">
                    <p className="text-2xl inline-flex">{emoji}</p>
                    <p className="text-xl inline-flex">
                        {post.reactions[name]}
                    </p>
                </div>
            </button>
        )
    );

    return <>{reactionButtons}</>;
};

export default ReactionBtn;
