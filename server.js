import express from "express";
import cors from "cors";

// https://stackoverflow.com/questions/64383909/
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// Do not change code above this line
const handler = (res, parsed) => {
  if (parsed.toString() == 'Invalid Date') {
    res.json({error: "Invalid Date"})
  } else {
    res.json({
      unix: Math.floor(parsed.getTime()),
      utc: parsed.toUTCString()
    })
  }
}

app.get("/api/:date", (req, res) => {
  let date = req.params.date
  if (/^[0-9]*$/.test(date)) {
    date = parseInt(date)
  }
  const parsed = new Date(date)
  handler(res, parsed)
})

app.get("/api/", (req, res) => {
  handler(res, new Date())
})

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
