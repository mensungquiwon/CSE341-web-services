const dns = require('node:dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
const express = require("express");
const routes = require("./routes");
const { initDb } = require("./db/connect");

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", routes);

initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Server is running at http://127.0.0.1:${PORT}`);
    });
  }
});