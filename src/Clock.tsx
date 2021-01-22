import React, { useEffect, useState } from "react";

const formatTime = (time: Date) => {
  let hours = time.getHours().toString(10);
  if (hours.length === 1) {
    hours = "0" + hours;
  }

  let minutes = time.getMinutes().toString(10);
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
};

const formatDate = (time: Date) => {
  return time.toLocaleString("default", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
};

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, [setTime]);

  return (
    <div
      style={{
        bottom: "4rem",
        color: "#efefef",
        fontFamily: "Lato",
        left: "4rem",
        position: "absolute",
        textShadow: "1px 2px 2px rgba(0, 0, 0, .5)",
      }}
    >
      <h1 style={{ fontSize: "8rem" }}>{formatTime(time)}</h1>
      <h2 style={{ fontSize: "2.5rem" }}>{formatDate(time)}</h2>
    </div>
  );
};

export default Clock;
