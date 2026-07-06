// const dns = require('node:dns');
// dns.setServers(['1.1.1.1', '8.8.8.8']);
const express = require("express");
const routes = require("./routes");
const { initDb } = require("./db/connect");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", routes);

// console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
// console.log("MONGODB_URI value:", process.env.MONGODB_URI);

initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
  }
});