import { Link } from "react-router-dom";
import Wrapper from "../Wrapper/Wrapper";

const Missing = () => {
    return (
        <Wrapper title="404">
            <div className="flex items-center flex-col justify-center m-4 gap-8">
                <h2 className="title text-2xl">Page not found!</h2>
                <p className="text-yellow-600 text-xl">
                    That&apos;s disappointing.
                </p>
                <Link
                    to="/"
                    className="border border-white border-solid rounded-lg p-4 w-60 flex items-center justify-center bg-indigo-600"
                >
                    <img src="/imgs/back.svg" alt="backward" />
                </Link>
            </div>
        </Wrapper>
    );
};

export default Missing;
