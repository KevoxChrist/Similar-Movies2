const express = require("express");
require("dotenv").config();
const request = require("postman-request");
const path = require("path");
const serverless = require("serverless-http");




const app = express();
const apiKey = process.env.TMDB_API_KEY;
const PORT = 3000;

console.log(apiKey);


app.use(express.static(path.join(__dirname, "../../client")))

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/index.html"));
});



// Search route
app.get("/search", (req, res) => {
  const query = req.query.query;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  request({ url: url, json: true }, (err, response, body) => {
    if (err) return res.status(500).json({ error: "Request failed" });
    res.send(body);
  });
});

app.get("/similar", (req, res) => {
  const movieId = req.query.movie_id; 
  const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`;

  request({ url, json: true }, (err, response, body) => {
    if (err) return res.status(500).json({ error: "Request failed" });
    res.send(body);
  });
});







module.exports = app;
module.exports.handler = serverless(app);


// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




