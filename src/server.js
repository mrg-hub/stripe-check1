var cors = require('cors');
const app = require("express")();
const stripe = require("stripe")("sk_test_2KYiDGsFdvpLYDPcr9NrHXav00K8cLUnXY");

app.use(require("body-parser").text());
app.use(cors());

app.post("/charge", async (req, res) => {
    console.log('I got payment request')
    try {
      let {status} = await stripe.charges.create({
        amount: 2000,
        currency: "usd",
        description: "An example charge",
        source: req.body
      });
  
      res.json({status});
    } catch (err) {
      res.json(err).status(500).end();
    }
  });

  app.listen(9000, () => console.log("Listening on port 9000"));