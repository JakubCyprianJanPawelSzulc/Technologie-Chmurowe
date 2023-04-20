import RedirectIfNotLogged from "./RedirectIfNotLogged";
import {useNavigate, useParams} from "react-router-dom";
import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import {useForm} from "react-hook-form";
import pi from "./pi";
import compareStrings from "./CompareToPi";


const Game = () => {
    RedirectIfNotLogged();
    const {nickname} = useParams()


    const [gameCreated, setGameCreated] = useState(false);
    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true})
    const navigate = useNavigate()
    const [id, setId] = useState(uuidv4())



    useEffect(() => {
        console.log(nickname)
        console.log(gameCreated)
        console.log(id)
        if (!gameCreated) {


            try {

                fetch(`http://localhost:4200/${nickname}/game`, {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nickname: nickname,
                        id: id,
                        score: 0,
                    })
                });
                setGameCreated(true);

            } catch (error) {
                console.log(error);
            }
        }
    }, [gameCreated, nickname]);

    const updateScore = async (id, score) => {
        try {
            await fetch(`http://localhost:4200/${nickname}/game`, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: id,
                    score: score
                })
            });

        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = async (game) => {
        const result = compareStrings(game.pi, pi)
        await updateScore(id, result)
        navigate(`/${nickname}/home`)
    }

    return (<div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-6">
                    <input {...register("pi", {required: "pi required"})} type="text" className="form-control block
        w-6/12
        mx-auto
        text-center
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                           placeholder="Pi number"/>
                </div>
                <button type="submit"
                        className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Let's check
                </button>
            </form>
        </div>
    )

}


export default Game