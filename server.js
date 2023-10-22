const express = require('express')
const app = express()
const port = 3000

app.all('/test', (req, res) => {
  res.redirect(308, "/target");
});

app.all('/target', (req, res) => {
  res.send(req.method);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
