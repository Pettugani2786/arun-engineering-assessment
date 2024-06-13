const express = require("express");
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/foodtrucks", (req, res) => {
  fs.readFile("./data/food_truck_data.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading data");
      return;
    }
    const foodTrucks = JSON.parse(data);  // Parse the JSON data
    res.json(foodTrucks);
  });
});


app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
