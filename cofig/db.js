const mongoose = require("mongoose");

module.exports.bootstrap = () => {
  var connectionString = process.env.MONGO_URI;
  mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected perfectly...");
    })
    .catch((err) => {
      console.log(err);
    });
};
