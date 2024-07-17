import React, { useState, useEffect } from "react";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="select-none text-muted-foreground" suppressHydrationWarning>
      {formatTime(currentTime)} &bull; {formatDate(currentTime)}
    </div>
  );
};

export default CurrentDateTime;
