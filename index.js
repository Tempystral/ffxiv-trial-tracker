// index.js
import Fastify from "fastify";
import pointOfView from "point-of-view";
import pugjs from "pug";

import fs from "fs";
import path from "path";
import fastifyStatic from "@fastify/static";

/**
 * App Variables
 */

const app = Fastify({logger:true})
const port = process.env.PORT || 8000;
const data = JSON.parse(fs.readFileSync('./data/data.json'))

/**
 *  App Configuration
 */


app.register(pointOfView, { engine: { pug: pugjs }, root: path.join(path.dirname("."), "views")});
app.register(fastifyStatic, {root: path.join(path.dirname("."), "public"),
                             prefix: "/public/",
                             wildcard: false,
                             serve: false
                            });

//app.set("view engine", "pug");
//app.use("/public", express.static(path.dirname(".") + "/public"))

/**
 * Routes Definitions
 */

app.get("/", async (req, res) => {
  //res.status(200).send("THIS IS A TEST");
  return res.view("index.pug", { title: "Home",
                                data: data,
                                scalefactor: {
                                  "fullhd": 24,
                                  "widescreen": 32,
                                  "desktop": 36,
                                  "tablet": 48
                                }
                              }
          );
});

/**
 * Server Activation
 */

await app.listen(port, '0.0.0.0', () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});