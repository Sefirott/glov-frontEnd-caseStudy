import { useState } from "react";

import "./App.css";

const App = () => {
  return (
    <div className="main">
      <h1>Customer Service GPT</h1>

      <div className="userResponse">
        <form className="vertical">
          <input
            type="text"
            placeholder="Your Message"
            className="textResponse"
          />
          <div className="responseButtonContainer">
            <input type="submit" value="Send" className="sendResponse" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
