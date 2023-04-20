import RedirectIfNotLogged from "./RedirectIfNotLogged";
import {Link, useParams} from "react-router-dom";
import React from "react";
import Logout from "./Logout";

const Home = () => {
    RedirectIfNotLogged()
    const {nickname} = useParams()
    return (
        <div className="flex flex-col text-center">
            <button
                className="mb-6 w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={`/${nickname}/game`}>New Game</Link>
            </button>
            <button
                className="mb-6 w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={`/${nickname}/profile`}>Profile</Link>
            </button>
            <button
                className="mb-6 w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={`/leaderboard`}>Leaderboard</Link>
            </button>
            <button
                className="mb-6 w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                <Link to={`/${nickname}/chat`}>Chat</Link>
            </button>
            <button
                    className="mb-6 w-6/12 mx-auto bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                <Logout/>
            </button>
        </div>
    )

}

export default Home;
