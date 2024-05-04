import { useState, useEffect } from "react";

import "./App.css";
interface Response {
  message: string;
  role: "gpt" | "user";
}
const serverlessURL = import.meta.env.REACT_APP_FUNCTION_URL;

const App = () => {
  const [responses, setResponses] = useState<Response[]>([]);
  const [responseValue, setResponeValue] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);

  const newResponse: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setResponeValue("");

    if (responseValue === "") {
      return;
    }

    const newResponseValue: Response[] = [
      ...responses,
      {
        message: responseValue,
        role: "user",
      },
    ];

    setResponses([...newResponseValue, { role: "gpt", message: "..." }]);

    const lambdaRequest = await fetch(serverlessURL, {
      method: "POST",
      body: JSON.stringify({ value: newResponseValue }),
    });
    setResponses([
      ...newResponseValue,
      {
        role: "gpt",
        message: (await lambdaRequest.text()).replace(
          /(\n|(?<!\\)\\(?!\\))/g,
          ""
        ),
      },
    ]);
  };

  useEffect(() => {
    if (clicked === false) {
      return;
    }
    const fetchRequest = async () => {
      const newResponseValue: Response[] = [
        ...responses,
        {
          message: "Need help with my device... It's not responding anymore",
          role: "user",
        },
      ];

      setResponses([...newResponseValue, { role: "gpt", message: "..." }]);

      const lambdaRequest = await fetch(serverlessURL, {
        method: "POST",
        body: JSON.stringify({ value: newResponseValue }),
      });
      setResponses([
        ...newResponseValue,
        {
          role: "gpt",
          message: (await lambdaRequest.text()).replace(
            /(\n+|(?<!\\)\\(?!\\)|nn\d+|nn|n\d+)/g,
            ""
          ),
        },
      ]);
    };
    fetchRequest();
  }, [clicked]);

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
        <div key={index + 100} className="conversation">
          <p key={index} className={`response-${response.role}`}>
            {response.message.replace(
              /(\n+|(?<!\\)\\(?!\\)|nn\d+|nn|n\d+)/g,
              ""
            )}
          </p>
        </div>
      ))}

      <div className="userResponse">
        {!clicked && (
          <div
            className="quickReply"
            onClick={(e) => {
              e.preventDefault();
              setClicked(true);
            }}
          >
            <p className="quickReply-title">Need help with my device...</p>
            <p className="quickReply-content">It's not responding anymore</p>
          </div>
        )}

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
