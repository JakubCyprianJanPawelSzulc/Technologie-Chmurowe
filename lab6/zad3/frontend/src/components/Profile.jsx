import RedirectIfNotLogged from "./RedirectIfNotLogged";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

const Profile = () => {
    RedirectIfNotLogged()
    const {register, handleSubmit} = useForm({shouldUseNativeValidation: true})
    const [profile, setProfile] = useState({})
    const {nickname} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/${nickname}`)
                const data = await response.json()
                setProfile(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    const updateMail = async (nickname, email) => {
        try {
            await fetch(`http://localhost:4200/${nickname}`, {
                credentials: "include",
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickname: nickname,
                    email: email
                })
            });

        } catch (error) {
            console.log(error);
        }
    }

    const handleLogout = async () => {
        try {
            await fetch('http://localhost:4200/logout', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (err) {
            console.log(err);
        } finally {
            navigate('/');
        }
    }

    const deleteProfile = async () => {
        handleLogout()
        try {
            await fetch(`http://localhost:4200/${nickname}`, {
                credentials: "include",
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nickname: nickname,
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = async (user) => {

        await updateMail(nickname, user.email)
    }
    console.log(profile)

    return (
        <div className={"flex flex-col"}>
            <div
                className={"w-6/12 mx-auto text-center px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"}>
                <div>
                    Nickname: {profile.nickname}
                </div>
                <div>
                    Email: {profile.email}
                </div>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit"
                        className="w-6/12 mx-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Change Email
                </button>
            </form>

            <button
                className="mx-auto mb-6 mt-10 w-6/12 mx-auto bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                onClick={() => deleteProfile(nickname)}>
                Delete Account
            </button>
        </div>
    )

}

export default Profile