// config.js (for chatbot configuration)
import { flow } from "./flow"; // Import the flow object

const config = {
  initialState: "start", // The starting point for the conversation
  stateMap: flow, // This links the chatbot states to the flow object
};

export default config;
