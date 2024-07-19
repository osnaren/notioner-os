const ws = new WebSocket(`ws://${location.host}`);

ws.onopen = () => {
  console.log("WebSocket connection established");
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log("Received:", data);
  // Handle incoming data
};

ws.onclose = () => {
  console.log("WebSocket connection closed");
};

export default ws;
