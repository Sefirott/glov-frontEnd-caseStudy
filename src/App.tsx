import { useState } from "react";

import "./App.css";
interface Response {
  message: string;
  role: "gpt" | "customer";
}

const serverlessURL = "";

const App = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [responseValue, setResponeValue] = useState<string>("");

  const newResponse: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setResponeValue("");

    const newResponseValue: Response[] = [
      ...responses,
      {
        message: responseValue,
        role: "customer",
      },
    ];
    const lambdaRequest = await fetch(serverlessURL, {
      method: "POST",
      body: JSON.stringify({ value: newResponseValue }),
    });
    setResponses([
      ...newResponseValue,
      {
        role: "gpt",
        message: await lambdaRequest.text(),
      },
    ]);
  };

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
        <form className="vertical" onSubmit={newResponse}>
          <input
            type="text"
            placeholder="Your Message"
            className="textResponse"
            value={responseValue}
            onChange={(e) => setResponeValue(e.currentTarget.value)}
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
