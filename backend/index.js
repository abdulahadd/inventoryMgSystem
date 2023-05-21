const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const path = require("path");
const userRoute = require("./routes/user");
const apiRoute = require("./routes/Api");



let app = express();

app.use(cors());
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, "dist")));
// app.use('/admin', adminRoute);

app.use("/user", userRoute);
app.use("/api", apiRoute);




const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log("server started" + PORT);
});

app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});


mongoose
  .connect("mongodb://localhost/Inventory", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to localDatabase");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

