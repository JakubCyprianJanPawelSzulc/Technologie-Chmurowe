
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

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

    return (
        <div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    )
}

export default Logout;
