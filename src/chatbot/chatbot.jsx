import { useState } from "react";
import flow from "./flow";

function Chatbot() {
  const [chatState, setChatState] = useState(flow.start);
  const [userInput, setUserInput] = useState("");

  const handleInput = (input) => {
    const keyword = input.toLowerCase();

    if (keyword === "orders") {
      setChatState(flow.orderHelp);
    } else if (keyword === "products") {
      setChatState(flow.productHelp);
    } else if (keyword === "support") {
      setChatState(flow.supportHelp);
    } else if (keyword === "help") {
      setChatState(flow.askForHelp);
    } else {
      setChatState({
        message:
          "Sorry, I didn't understand that. Please type 'orders', 'products', 'support', or 'help'.",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput(userInput);
    setUserInput(""); // Clear the input field
  };

  return (
    <div>
      <p>{chatState.message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your response here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
