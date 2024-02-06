const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./route/user");
const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("Enter your srv string/UserDB")
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
