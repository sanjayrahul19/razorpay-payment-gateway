const mongoose = require("mongoose");
const url =
  "mongodb+srv://sanjayrahul:1234567890@cluster0.mj1ceac.mongodb.net/razor_pay?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
const connectDb = async () => {
  try {
    const con = await mongoose.connect(url);
    console.log(`mongoDb connected:${con.connection.host}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDb;
