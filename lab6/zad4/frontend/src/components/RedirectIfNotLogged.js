import {useNavigate, useParams} from "react-router-dom";
import CheckCookie from "./CheckCookie";
import {useEffect, useState} from "react";

const RedirectIfNotLogged = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {nickname} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookies = async () => {
            const cookie = await CheckCookie();
            if (cookie.isLoggedIn && cookie.nickname === nickname) {
                setIsLoggedIn(true);
            } else {
                navigate(`/`);
            }
        }
        checkCookies();

    }, []);
}

export default RedirectIfNotLogged