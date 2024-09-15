import React, { useState, useEffect } from "react";
import './clock.scss'
const Clock: React.FC = () => {
  // State to store the current time
  const [time, setTime] = useState(new Date());

  // useEffect to update the time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date()); // Set the current time every second
    }, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  // Format the time (you can customize this as you like)
  const formattedTime = time.toLocaleTimeString();

  return (
    <div className="clock-container">
      <h1 className="clock">{formattedTime}</h1>
    </div>
  );
};

// Simple styles for the clock
// const styles = {
//   clockContainer: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: 'transparent',
    
//   },
//   clock: {
//     color: "#61dafb",
//     fontFamily: "semi-bold",
//   },
// };

export default Clock;
