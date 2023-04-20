import {Link} from "react-router-dom";
import React from "react";

const HomeButton = () => {
    return (
        <Link to={`/`} className="flex flex-col">
            <button className="mx-auto font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
                &#120703; Game
            </button>
        </Link>
    );
}

export default HomeButton;