var express = require("express");
const multer = require("multer");
const path = require("path");
var router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const imageFileFilter = (req, file, callback) => {
  const allowedFileTypes = /jpeg|jpg|png/; // Add other image file extensions as needed
  const mimeType = allowedFileTypes.test(file.mimetype);
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return callback(null, true);
  }

  const error = new Error("Only image files are allowed!");
  error.status = 500;
  return callback(error);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

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

router.post(
  "/v1/plugin/stripe/create-payment-intent",
  async (req, res, next) => {
    const { items, currency } = req.body;

    const calculateOrderAmount = (items) => {
      // Replace this constant with a calculation of the order's amount
      // Calculate the order total on the server to prevent
      // people from directly manipulating the amount on the client
      let totAmount = 0;
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        totAmount += item.price * item.quantity;
      }
      return totAmount;
    };

    const totalAmount = calculateOrderAmount(items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency,
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntent: paymentIntent,
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
  }
);

router.post("/v1/plugin/stripe/confirm-payment-intent", async (req, res) => {
  const { paymentIntentId } = req.body;
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  console.log(paymentIntent);
  return res.status(200).json({ paymentIntent });
});

router.get("/v1/all-inventory", async (req, res) => {
  let inventoryItems = [
    {
      approvedForMarketplace: false,
      business: "65ba870ad7824794a182d01d",
      category: "T-shirts",
      description: "t-shirts with your own design on it",
      img: "uploads/shirt-front.png",
      name: "T-shirt",
      price: 1500,
      quantity: 10,
      _id: "65ba87d4d7824794a182d041",
    },
    {
      approvedForMarketplace: false,
      business: "65ba870ad7824794a182d01d",
      category: "T-shirts",
      description: "Polo with your design on it",
      img: "uploads/white_polo_shirt_front_nobg.png",
      name: "Polo",
      price: 2500,
      quantity: 10,
      _id: "65bb65d2a382a692420a6233",
    },
  ];
  res.send({ inventoryItems });
});

router.post("/v1/upload-file", upload.single("file"), async (req, res) => {
  try {
    console.log(req.file, req.body);

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    console.log(req.file.path);
    res.json({ file: req.file.path });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error });
  }
});

module.exports = router;
