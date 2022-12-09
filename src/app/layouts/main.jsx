import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
  const { error, initialize, progress, status } = useMockData();

  const handleInit = () => {
    initialize();
  };

  return (
    <div className="container mt-5">
      <h1>Main Page</h1>
      <h3>Firebase data initialization</h3>
      <ul>
        <li>Status: {status}</li>
        <li>Progress: {progress}%</li>
        {error && <li>Error: {error}</li>}
      </ul>
      <button className="btn btn-primary" onClick={handleInit}>
        Init data
      </button>
    </div>
  );
};

export default Main;
