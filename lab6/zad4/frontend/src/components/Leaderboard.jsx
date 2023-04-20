import {useEffect, useState} from "react";

const Leaderboard = () => {
    const [leaderBoard, setLeaderBoard] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4200/leaderboard`)
                const data = await response.json()
                setLeaderBoard(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

    }, [])

    return (<div>
        {leaderBoard.map((msg, index) => {
            return <div key={index}
                        className={"w-6/12 mx-auto text-center px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0"}>
                <div>{msg.nickname}</div>
                <div>{msg.score}</div>
            </div>
        })}
    </div>)


}

export default Leaderboard