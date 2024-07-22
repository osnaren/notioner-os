"use client";
import React, { useState } from "react";

const UnauthorizedPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = () => {
    // Handle button click logic here
    console.log("Button clicked");
  };

  return (
    <div>
      <h1>Unauthorized Page</h1>
      <label htmlFor="inputField">Input Field:</label>
      <input type="text" id="inputField" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleButtonClick} type="submit">
        Submit
      </button>
    </div>
  );
};

export default UnauthorizedPage;
