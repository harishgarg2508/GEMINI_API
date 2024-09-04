const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const bodyParser = require("body-parser");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// const prompt = "what the synonym of the word harish.";

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World Gemini");
});

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return result.response.text();
  } catch (err) {
    console.log(err);
  }
};

// generate()

app.get("/api/content", async (req, res) => {
  try {
    const data = req.body.rishu;
    const result = await generate(data);
    res.send({
      result: result,
    });
  } catch (err) {
    res.send("error" + err);
  }
});

app.listen(3000, () => {
  console.log("Server is started");
});
