const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const usermodel = require("./controller/userController");
const { data } = require('autoprefixer');
const route = require("./routes/route")
app.use(express.json());
// const port = process.env || 3000;

mongoose
  .connect(
    "mongodb+srv://vaibhav_:DP5cPU2UQSOB14RT@cluster0.27uy03s.mongodb.net/quick-alfa?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

 app.use("/",route)

  const port = 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));


