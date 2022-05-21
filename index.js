// index.js
import express from "express";
import fs from "fs";
import path from "path";
import favicon from "serve-favicon";

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || 8000;
const data = JSON.parse(fs.readFileSync('./data/data.json'))


/**
 *  App Configuration
 */
app.set("views", path.join(path.dirname("."), "views"));
app.set("view engine", "pug");
app.use("/public", express.static(path.dirname(".") + "/public"))
app.use(favicon(path.join(path.dirname("."), "public/img/favicon.ico")))

/**
 * Routes Definitions
 */

app.get("/", (req, res) => {
  //res.status(200).send("THIS IS A TEST");
  res.render("index", { title: "Home",
                        data: data
                      });
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});