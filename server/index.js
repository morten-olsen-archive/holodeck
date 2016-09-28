require('./apps/loader');
require('./apps/client');

const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.end(`
<html>
  <body>
    <script src="/client/client.js"></script>
  </body>
</html>
    `)
})

app.listen(5000);
