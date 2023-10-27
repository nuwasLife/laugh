import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const url = "https://v2.jokeapi.dev/joke/Any?contains=";
let joke = "";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", async (req, res) => {
  console.log(req.body.name);

  try {
    const response = await axios.get(url + req.body.name);
    const results = response.data.setup;
    console.log(results);
    if (response.data.error === false)
      joke = response.data.setup + " " + response.data.delivery;
    else joke = "No joke found with word: " + req.body.name;
    res.render("index.ejs", {
      joke: joke,
    });
  } catch (error) {
    res.sendStatus(500);
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
