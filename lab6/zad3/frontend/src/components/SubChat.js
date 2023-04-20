import {useState} from "react";
import mqtt from "mqtt/dist/mqtt";

const SubChat = ({topic}) => {
    const [message, setMessage] = useState([])

    const client = mqtt.connect('ws://localhost:1884')
    client.on('message', (topic, msg) => {
        setMessage([...message, msg.toString()])
    })

    client.on('connect', () => {
        client.subscribe(topic)
    })

    return (<div>
        {message.map((msg, index) => {
            return <div key={index}
            className={"w-6/12 mx-auto text-center px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"}>
                <div>Nickname: {msg.split(',')[0]}</div>
                <div>Message: {msg.split(',')[1]}</div>
            </div>
        })}
    </div>)


}

export default SubChat

