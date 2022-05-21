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
const siteName = "Final Fantasy XIV Duty Tracker";

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
  res.render("all", { title: siteName, data: data });
});

app.get("/A_Realm_Reborn", (req, res) => {
  res.render("single", { title: siteName + " - A Realm Reborn", exp: data.expansions[0] });
});

app.get("/Heavensward", (req, res) => {
  res.render("single", { title: siteName + " - Heavensward", exp: data.expansions[1] });
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});