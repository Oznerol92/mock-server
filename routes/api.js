var express = require("express");
var router = express.Router();

router.get("/v1/auth/session", (req, res, next) => {
  res.send({
    user: {
      api_usage: { count: 0, date: "2024-01-24T08:37:11.828Z" },
      bookings: [],
      budgets: [],
      createdAt: "2024-01-24T08:38:38.739Z",
      customer_id: "cus_PQtmnRAjH5HlNy",
      email: "client@email.com",
      isAdmin: false,
      isDev: false,
      isGuest: true,
      paymentIntent: undefined,
      payment_intents: [],
      payment_methods: [],
      removed: false,
      sale: undefined,
      session: {
        userId: "65b0cc8eb8869ad3ab031fa4",
        valid: true,
        _id: "65b0cc8eb8869ad3ab031fa6",
      },
      username: "client",
      _id: "65b0cc8eb8869ad3ab031fa4",
    },
  });
});

router.post("/v1/auth/create-guest-session", (req, res, next) => {
  console.log("here");
  res.status(200).json({
    message: "Guest session created",
    user: {
      api_usage: { count: 0, date: "2024-01-24T08:37:11.828Z" },
      bookings: [],
      budgets: [],
      createdAt: "2024-01-24T08:38:38.739Z",
      customer_id: "cus_PQtmnRAjH5HlNy",
      email: "client@email.com",
      isAdmin: false,
      isDev: false,
      isGuest: true,
      paymentIntent: undefined,
      payment_intents: [],
      payment_methods: [],
      removed: false,
      sale: undefined,
      session: {
        userId: "65b0cc8eb8869ad3ab031fa4",
        valid: true,
        _id: "65b0cc8eb8869ad3ab031fa6",
      },
      username: "client",
      _id: "65b0cc8eb8869ad3ab031fa4",
    },
  });
});

router.post("/v1/plugin/stripe/create-payment-intent", (req, res, next) => {
  res.send({
    clientSecret:
      "pi_3Oc1zAAlUKnrAXrl0ZTZyiTP_secret_a6G2XRr3uy1IIuWYmKNAzToi9",
    paymentIntentId: "pi_3Oc1zAAlUKnrAXrl0ZTZyiTP",
    saleId: "65b0cca9b8869ad3ab031fab",
    transactionId: "65b0cca9b8869ad3ab031fac",
    order: {
      cancelled: false,
      clientAccepted: true,
      confirmed: false,
      createdAt: "2024-01-24T08:39:05.133Z",
      currency: "GBP",
      currentStep: 1,
      deleted: false,
      delivered: false,
      devAccepted: false,
      hasDesign: false,
      items: [
        {
          approvedForMarketplace: false,
          business: "659c1cd4edf2c3267c57f43b",
          category: "hoodies",
          description: "hoodie with your own design on it",
          img: "uploads/white-hoodie.png",
          name: "hoodie",
          price: 500,
          quantity: 1,
          _id: "659c29f8c1ae562ac68145ac",
        },
        {
          approvedForMarketplace: false,
          business: "655dc6a4899de08a03c26035",
          category: "hoodies",
          description: "Hoodie",
          img: "/static/media/white-hoodie.7957a8f65afebfbbc5f9.png",
          name: "Hoodie1",
          price: 500,
          quantity: 1,
          _id: "0003",
        },
      ],
      messages: [],
      paymentIntents: [],
      paymentSteps: 5,
      quoting: false,
      refunded: false,
      status: "processing",
      totalAmount: 1000,
      updatesCount: 0,
      _id: "65b0cca9b8869ad3ab031fad",
    },
  });
});

module.exports = router;
