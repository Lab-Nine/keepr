const express = require('express');

const app = express();
const path = require('path');

const PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
