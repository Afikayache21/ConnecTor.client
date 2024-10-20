import React, { useState, useEffect } from "react";
import './clock.scss';

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

  // Format the time to display only hours and minutes (08:36)
  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  });

  return (
    <div className="clock-container">
      <h1 className="clock">{formattedTime}</h1>
    </div>
  );
};

export default Clock;
