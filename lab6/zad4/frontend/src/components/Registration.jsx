import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form"
import checkCookie from "./CheckCookie";
import RedirectIfLogged from "./RedirectIfLogged";


const Registration = () => {

    RedirectIfLogged()

    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true})
    const navigate = useNavigate()
    const isLoggedIn = checkCookie()

    const onSubmit = async (user) => {
        try {
            const response = await fetch(`http://localhost:4200/registration/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickname: user.nickname,
                    email: user.email,
                    password: user.password
                })
            })
            const jsonResponse = await response.json()
            if (isLoggedIn) {
                console.log("user logged in")
                navigate(`/${jsonResponse.nickname}/home`)
            } else {
                console.log("user didnt logged")
            }
            console.log("user added")
        } catch (error) {
            console.log("error", error)
        }
    }

    return (<div className="flex flex-col">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-6">
                <input {...register("nickname", {required: "nickname required"})} type="text" className="form-control block
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
                       placeholder="nickname"/>
            </div>
            <div className="form-group mb-6">
                <input {...register("email", {required: "email required"})} type="email" className="form-control block
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
                       placeholder="email"/>
            </div>
            <div className="form-group mb-6">
                <input {...register("password", {required: "password required"})} type="password" className="form-control block
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
                       placeholder="password"/>
            </div>
            <button type="submit"
                    className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Sign up
            </button>
        </form>
        <h3 className="mx-auto font-medium leading-tight text-1xl mt-20 mb-5 text-blue-600">Already registered? Log down
            here</h3>
        <button
            className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link to={'/login'}>Log in</Link>
        </button>
    </div>)
}

export default Registration

