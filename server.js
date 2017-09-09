const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema.graphql");

app.use(express.static(__dirname));
app.use("/graphql", graphqlHTTP(() => ({ schema })));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, (request, response, error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(
      "%s App is running at http://localhost:%d in %s mode",
      chalk.green("✓"),
      app.get("port"),
      app.get("env")
    );

    console.info(
      `==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`
    );
    console.info("  Press CTRL-C to stop\n");
  }
});
