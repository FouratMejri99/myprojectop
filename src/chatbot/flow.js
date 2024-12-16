const flow = {
  start: {
    message:
      "Hi! What would you like help with? You can type 'orders', 'products', or 'support'.",
    nextStates: ["orders", "products", "support"],
  },
  orders: {
    message:
      "You can check the status of your orders here. Type 'help' to go back.",
    nextStates: ["help"],
  },
  products: {
    message: "Here are the details of your products. Type 'help' to go back.",
    nextStates: ["help"],
  },
  support: {
    message: "Here's how you can contact support. Type 'help' to go back.",
    nextStates: ["help"],
  },
  help: {
    message:
      "What would you like help with? You can type 'orders', 'products', or 'support'.",
    nextStates: ["orders", "products", "support"],
  },
};

export default flow;
