const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const userRouter = require("./Routes/user");
const productRouter = require("./Routes/product");

require("dotenv/config");

const app = express();
const PORT = process.env.PORT || 6060;

app.use(cors());
app.use(logger("tiny"));
app.use(express.json());

// Database Connection
const db = process.env.MONGO_URI;

mongoose
  .set("strictQuery", true)
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

// Routers
app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});
