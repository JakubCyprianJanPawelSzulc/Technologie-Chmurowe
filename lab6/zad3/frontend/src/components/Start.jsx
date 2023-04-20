import React from "react";
import {Link} from "react-router-dom";
import RedirectIfLogged from "./RedirectIfLogged";

const Start = () => {

    RedirectIfLogged()


    return (
        <div className="flex flex-col text-center">
            <button
                className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={'/registration'}>Registration</Link>
            </button>
            <button
                className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={'/login'}>Log in</Link>
            </button>
        </div>
    )
}

export default Start