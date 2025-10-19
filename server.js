const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51SJzgHBqT0SCKdMIk976wkpOut66DOrDYOsO5IwJ1CdgmMKCSBiieJK761jkafpOoHBuypzkkK5pAScsq2O5RK7S00a6xVOy0x"); 
const path = require("path");

app.use(express.static("leveltwo-final"));
app.use(express.json());

app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true },
        });

        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        console.error("Payment error:", err);
        res.status(500).send({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});