class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const keyword = message.toLowerCase();

    if (keyword === "orders") {
      this.actionProvider.handleOrders();
    } else if (keyword === "products") {
      this.actionProvider.handleProducts();
    } else if (keyword === "support") {
      this.actionProvider.handleSupport();
    } else if (keyword === "help") {
      this.actionProvider.handleHelp();
    } else {
      this.actionProvider.handleUnknown();
    }
  }
}

export default MessageParser;
