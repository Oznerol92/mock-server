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
      business: "66155ccd04bbee9c32f4fbc6",
      category: "cameras",
      currency: "gbp",
      customItems: [],
      description: "camera",
      img: "",
      imgs: ["uploads/camera2.jpg", "uploads/camera3.jpg"],
      name: "camera",
      price: 25000,
      totQuantity: 8,
      _id: "6683e1286bf236800f669734",
    },
    {
      approvedForMarketplace: false,
      business: "66155ccd04bbee9c32f4fbc6",
      category: "t-shirts",
      currency: "gbp",
      customItems: [
        {
          colour: "Red",
          customImages: [
            {
              designArea: {
                front: {
                  height: "80.36072144288578",
                  left: "18.40277777777778",
                  top: "15.988226452905813",
                  width: "61.57407407407407",
                },
              },
              name: "front",
              url: "uploads/black-polo-front.png",
              _id: "668fff87d8692676b9cda3dd",
            },
            {
              designArea: {
                back: {
                  height: "79.96031746031747",
                  left: "24.189814814814813",
                  top: "13.59126984126984",
                  width: "50.69444444444444",
                },
              },
              name: "back",
              url: "uploads/black-polo-back.png",
              _id: "668fff87d8692676b9cda3de",
            },
            {
              designArea: {
                right: {
                  height: "40.869565217391305",
                  left: "26.041666666666668",
                  top: "35.11888586956522",
                  width: "35.18518518518518",
                },
              },
              name: "right",
              url: "uploads/black-polo-right.png",
              _id: "668fff87d8692676b9cda3df",
            },
            {
              designArea: {
                left: {
                  height: "41.30434782608695",
                  left: "38.54166666666667",
                  top: "35.33627717391305",
                  width: "38.657407407407405",
                },
              },
              name: "left",
              url: "uploads/black-polo-left.png",
              _id: "668fff87d8692676b9cda3e0",
            },
          ],
          sizes: [
            {
              quantity: 312,
              size: "XS",
              _id: "668fff87d8692676b9cda3dc",
            },
            { size: "M", quantity: 10, _id: "669f618f617dbec65239d45f" },
          ],
          _id: "668fff87d8692676b9cda3db",
        },
      ],
      description: "polo",
      img: "",
      imgs: ["uploads/t-shirts.jpeg"],
      name: "polo",
      price: 2500,
      totQuantity: 399,
      _id: "668fff86d8692676b9cda3d2",
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
