const express = require('express');
const app = express();
const chalk = require('chalk');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const tweets = require('./routes/api/tweets');

mongoose
  .connect(process.env.MONGOURI_HOST, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log(chalk.green('Connected to MongoDb successfully')))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  console.log(res);
  res.send('Hello');
});

//middleware for parsing json objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/tweets', tweets);

app.listen(port, () =>
  console.log(chalk.blue(`Server is listening on ${port}`))
);
