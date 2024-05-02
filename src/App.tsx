import { useState } from "react";

import "./App.css";

function App() {
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
          <input type="submit" value="Send" className="sendResponse" />
        </form>
      </div>
    </div>
  );
}

export default App;
