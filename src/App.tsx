import { useState } from "react";

import "./App.css";

function App() {
  return (
    <main>
      <h1>Customer Service GPT</h1>

      <form className="vertical">
        <input type="text" placeholder="Message" />
        <input type="submit" value="Send" />
      </form>
    </main>
  );
}

export default App;
