import "./App.css"
import React from "react";
import {Route, Routes} from "react-router-dom"
import Registration from "./components/Registration"
import Login from "./components/Login"
import Start from "./components/Start"
import Home from "./components/Home"
import Game from "./components/Game"
import Chat from "./components/Chat"
import Leaderboard from "./components/Leaderboard"
import HomeButton from "./components/HomeButton"
import Profile from "./components/Profile";
import ChatRoom from "./components/ChatRoom";


export default function App() {
    return (
        <div className="flex flex-col">
            <HomeButton/>
            <Routes>
                <Route path="/" element={<Start/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/:nickname/profile" element={<Profile/>}/>
                <Route path="/:nickname/home" element={<Home/>}/>
                <Route path="/:nickname/game" element={<Game/>}/>
                <Route path="/:nickname/chat" element={<Chat/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/:nickname/chat/:room" element={<ChatRoom/>}/>
                <Route path="*" element={<Start/>}/>
            </Routes>
        </div>
    )
}
