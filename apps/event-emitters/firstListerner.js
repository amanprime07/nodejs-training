const TicketManager = require("./ticketManager");

const ticketManager = new TicketManager(10);

ticketManager.on("buy", (args) => {
    console.log("Someone purchased a ticket! Info:", args);
    // console.log("I will send an email to", args.email, "with the price of", args.price);
});

ticketManager.buy("elie@cnbc.com", 10);
ticketManager.buy("elie@cnbc.com", 10);


ticketManager.once("buy", () => {
    console.log("This is only called once");
});

ticketManager.buy("test@example.com", 20);
ticketManager.buy("test@example.com", 20);
