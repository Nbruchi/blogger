import React from "react";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../app/redux/usersSlice";
import Usercard from "../components/Usercard";
import Wrapper from "../Wrapper/Wrapper";

const Users = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <Usercard key={user.id} userId={user.id} />
    ));

    return (
        <Wrapper title="Post Authors">
            <section className="flex w-full flex-col items-center justify-center my-8">
                <h2 className="title text-4xl text-center font-bold">
                    Authors
                </h2>
                <ul className="grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 place-content-start p-4 gap-4">
                    {renderedUsers}
                </ul>
            </section>
        </Wrapper>
    );
};

export default Users;
