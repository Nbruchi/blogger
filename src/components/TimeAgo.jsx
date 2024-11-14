import { formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const TimeAgo = ({ timestamp }) => {
    let timeAgo = "";

    if (timestamp) {
        const date = parseISO(timestamp);
        const timePeriod = formatDistanceToNow(date);
        timeAgo = `${timePeriod} ago`;
    }

    return (
        <p className="!text-xs text-gray-600 dark:text-gray-400">
            &nbsp; <i>{timeAgo}</i>
        </p>
    );
};

export default TimeAgo;
