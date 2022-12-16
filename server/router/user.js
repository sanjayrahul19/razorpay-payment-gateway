const router = require("express").Router();
const Razorpay = require("razorpay");
const payment = require("../model/user");
router.post("/orders", (req, res) => {
  let instance = new Razorpay({
    key_id: "rzp_test_tkQO4aJBtDUgge",
    key_secret: "fBZJ3SfxKG0oQ80K1o87jKHA",
  });
  var options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
      return res.send({ msg: "server error" });
    }
    console.log(order);
    return res.send({ msg: "order created", data: order });
  });
});

router.post("/verify", async (req, res) => {
  try {
    const body =
      req.body.response.razorpay_order_id +
      "|" +
      req.body.response.razorpay_payment_id;

    console.log(req.body.response.razorpay_order_id);
    console.log(req.body.response.razorpay_payment_id);

    var crypto = require("crypto");
    var expectedSign = crypto
      .createHmac("sha256", "fBZJ3SfxKG0oQ80K1o87jKHA")
      .update(body.toString())
      .digest("hex");
    console.log(req.body.response.razorpay_signature);
    console.log(expectedSign);
    if (expectedSign === req.body.response.razorpay_signature) {
      await new payment(req.body.response).save();
      return res.send({ msg: "Payment verified" });
    } else {
      return res.send({ msg: "Invalid signature" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
