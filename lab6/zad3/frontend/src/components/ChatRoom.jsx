import RedirectIfNotLogged from "./RedirectIfNotLogged";
import {useParams} from "react-router-dom";
import SubChat from "./SubChat";
import PubChat from "./PubChat";

const ChatRoom = () => {
    RedirectIfNotLogged()
    const {room} = useParams()

    return(
        <div>
            <SubChat topic={room}/>
            <PubChat room={room}/>
        </div>

    )

}

export default ChatRoom