const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use('/posts', postsRoute);

app.get('/', (req, res) => {
  res.send('hey there');
});

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

app.listen(8000, () => {
  console.log('server up at 8000');
});
