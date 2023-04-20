import React from "react";
import mqtt from "mqtt/dist/mqtt";
import {useForm} from "react-hook-form";
import CheckCookie from "./CheckCookie";


const PubChat = ({room}) => {

    const client = mqtt.connect('ws://localhost:1884')

    const {register, handleSubmit, reset} = useForm({shouldUseNativeValidation: true})

    const onSubmit = async (comment) => {
        const nickname = (await CheckCookie()).nickname
        client.publish(room, ([nickname, comment.message]).toString())
        reset()
    }

    return (<div className="flex flex-col">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-6">
                    <input {...register("message", {required: "message required"})} type="text" className="form-control block
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
                           placeholder="Message"/>
                </div>
                <button type="submit"
                        className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Send
                </button>
            </form>
        </div>
    )

};

export default PubChat
