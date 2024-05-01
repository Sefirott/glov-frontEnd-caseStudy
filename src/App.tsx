import { useState } from "react";

import "./App.css";

function App() {
  return (
    <div className="main">
      <div>
        <h1>Customer Service GPT</h1>
      </div>

      <div className="userResponse">
        <form className="vertical">
          <input type="text" placeholder="Message" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default App;
