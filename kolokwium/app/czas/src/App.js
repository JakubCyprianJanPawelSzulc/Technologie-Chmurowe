import React, { useState, useEffect } from "react";

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return (
    <div className="App">
      <h1>Aktualny czas: {formattedTime}</h1>
    </div>
  );
}

export default App;
