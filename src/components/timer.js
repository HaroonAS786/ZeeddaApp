import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

const TimeComponent = ({durationInSeconds, setResendCodeVisible}) => {
  const [timer, setTimer] = useState(durationInSeconds);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
        setResendCodeVisible(timer - 1);
      }, 1000); // decrement the timer every second (1000 milliseconds)
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return <Text>{formatTime(timer)}</Text>;
};

export default TimeComponent;
