'use client';
import React, { useEffect, useState } from 'react';
import CountdownTimer from '@components/shared/CountdownTimer';
import styled from 'styled-components';

const StatusWrapper = styled.div`
  text-align: center;
  padding: 20px;
`;

const Status: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState('Connecting...');
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [nextFetch, setNextFetch] = useState<Date | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${location.host}`);

    ws.onopen = () => {
      setStatusMessage('Connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatusMessage(data.status);

      const lastFetched = new Date();
      const nextFetch = new Date(lastFetched.getTime() + 5 * 60000);
      setLastFetch(lastFetched);
      setNextFetch(nextFetch);
    };

    ws.onclose = () => {
      setStatusMessage('Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <StatusWrapper>
      <h1>Status</h1>
      <p>{statusMessage}</p>
      <p>Last Fetch: {lastFetch ? lastFetch.toLocaleString() : 'N/A'}</p>
      <p>Next Fetch: {nextFetch ? nextFetch.toLocaleString() : 'N/A'}</p>
      <CountdownTimer nextFetch={nextFetch} />
    </StatusWrapper>
  );
};

export default Status;
