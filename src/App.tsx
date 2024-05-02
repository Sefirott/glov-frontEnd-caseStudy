import { useState } from "react";

import "./App.css";
interface Response {
  message: string;
  role: "gpt" | "customer";
}

const App = () => {
  const [responses, setResponses] = useState<Response[]>([]);

  return (
    <div className="main">
      {responses.length === 0 && (
        <div>
          <h1>Customer Service GPT</h1>
          <p style={{ textAlign: "center" }}>
            Hi 👋, how can i help you today?
          </p>
        </div>
      )}

      {responses.map((response, index) => (
        <div className="conversation">
          <p key={index} className={`response-${response.role}`}>
            {response.message}
          </p>
        </div>
      ))}

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
