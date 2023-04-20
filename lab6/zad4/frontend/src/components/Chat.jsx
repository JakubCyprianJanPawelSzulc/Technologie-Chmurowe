
import React from "react";
import RedirectIfNotLogged from "./RedirectIfNotLogged";
import {useForm} from "react-hook-form";
import {useNavigate, useParams} from "react-router-dom";

const Chat = () => {
    RedirectIfNotLogged()
    const {nickname} = useParams()
    const navigate = useNavigate()

    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true})

    const onSubmit = (room) => {
        navigate(`/${nickname}/chat/${room.name}`)
    }

    return (<div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-6">
                    <input {...register("name", {required: "Room name required"})} type="text" className="form-control block
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
                           placeholder="Room Name"/>
                </div>
                <button type="submit"
                        className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Hop in
                </button>
            </form>
        </div>
    )

};

export default Chat;
