const express = require('express');
const app = express();
const chalk = require('chalk');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send('Hello'));

mongoose
  .connect(process.env.MONGOURI_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(chalk.green('Connected to MongoDb successfully')))
  .catch((err) => console.log(err));

app.listen(port, () =>
  console.log(chalk.blue(`Server is listening on ${port}`))
);
