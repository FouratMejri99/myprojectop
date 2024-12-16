class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOrders = () => {
    const message = this.createChatBotMessage(
      "You can check the status of your orders here. Type 'help' to go back."
    );
    this.updateChatbotState(message);
  };

  handleProducts = () => {
    const message = this.createChatBotMessage(
      "Here are the details of your products. Type 'help' to go back."
    );
    this.updateChatbotState(message);
  };

  handleSupport = () => {
    const message = this.createChatBotMessage(
      "Here's how you can contact support. Type 'help' to go back."
    );
    this.updateChatbotState(message);
  };

  handleHelp = () => {
    const message = this.createChatBotMessage(
      "What would you like help with? You can type 'orders', 'products', or 'support'."
    );
    this.updateChatbotState(message);
  };

  handleUnknown = () => {
    const message = this.createChatBotMessage(
      "Sorry, I didn't understand that. Please type 'orders', 'products', 'support', or 'help'."
    );
    this.updateChatbotState(message);
  };

  updateChatbotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
