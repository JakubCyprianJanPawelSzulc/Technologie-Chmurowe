import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import CheckCookie from "./CheckCookie";

const RedirectIfLogged = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkCookies = async () => {
            const cookie = await CheckCookie();
            if (cookie.isLoggedIn) {
                navigate(`/${cookie.nickname}/home`)
            }
        }
        checkCookies();
    }, []);
}

export default RedirectIfLogged