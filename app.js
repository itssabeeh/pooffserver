const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const dmessageRoute = require('./routes/dmessages');
const { notFound, errorHandler } = require('./middlewares/errorMiddle');
const app = express();

//middleware

app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/dmessages', dmessageRoute);

app.use(notFound);
app.use(errorHandler);

//db connection
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Connected');
  })
  .catch((err) => {
    console.log('not connected' + err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('server up at 8000');
});
