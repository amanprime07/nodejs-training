const TicketManager = require("./ticketManager");
const EmailService = require("./emailService");
const DatabaseService = require("./databaseService");

const ticketManager = new TicketManager(30);
const emailService = new EmailService();
const databaseService = new DatabaseService();

const onBuy = () => {
    console.log("I will be removed soon");
};

ticketManager.on("buy", (email, price, timestamp) => {
  emailService.sendEmail(email);
  databaseService.save(email, price, timestamp);
});

ticketManager.on("error", (error) => {
  console.error(`Gracefully handling our error: ${error}`);
});


ticketManager.buy("test1@example.com", 30);
ticketManager.buy("test2@example.com", 40);

console.log(`We have ${ticketManager.listenerCount("buy")} listener(s) for the buy event`);
console.log(`We have ${ticketManager.listenerCount("error")} listener(s) for the error event`);

ticketManager.on("buy", onBuy);
console.log(`We added a new event listener bringing our total count for the buy event to: ${ticketManager.listenerCount("buy")}`);
ticketManager.buy("test@email", 20);

ticketManager.off("buy", onBuy);

console.log(`We now have: ${ticketManager.listenerCount("buy")} listener(s) for the buy event`);
ticketManager.buy("test@email", 20);

ticketManager.removeAllListeners("buy");
console.log(`We have ${ticketManager.listenerCount("buy")} listeners for the buy event`);
ticketManager.buy("test@email", 20);
console.log("The last ticket was bought");