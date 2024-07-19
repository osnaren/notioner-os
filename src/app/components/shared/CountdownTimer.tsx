import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC<{ nextFetch: Date | null }> = ({ nextFetch }) => {
  const [timeRemaining, setTimeRemaining] = useState('00:00');

  useEffect(() => {
    if (!nextFetch) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = nextFetch.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining('00:00');
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeRemaining(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [nextFetch]);

  return <p>Countdown: {timeRemaining}</p>;
};

export default CountdownTimer;
