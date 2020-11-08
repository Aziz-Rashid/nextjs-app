const mongoose = require("mongoose");

const dbUri =
  process.env.NODE_ENV !== "production"
    ? "mongodb://localhost/themoticom"
    : process.env.DB_URL;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () =>
  console.log("Mongoose is connected to ", dbUri)
);

mongoose.connection.on("error", (err) => console.log(err));

mongoose.connection.on("disconnected", () =>
  console.log("Mongoose is disconnected")
);

process.on("SIGINT", () => {
  console.log("Mongoose disconnected on exit process");
  process.exit(0);
});

module.exports = mongoose;
