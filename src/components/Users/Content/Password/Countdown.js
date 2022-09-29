import React from 'react';
import { useState, useEffect } from 'react';

export default function Countdown(props) {
  const { startingSeconds = 180 } = props;

  const [secs, setSeconds] = useState(startingSeconds);
  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      }
    }, 1000);
    return () => {
      clearInterval(sampleInterval);
    };
  });

  return <p className="noClick time">{secs < 10 ? `0${secs}` : secs} s</p>;
}
