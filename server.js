const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const routes = require('./routes');

const port = 5000;
const url = process.env.MONGODB_URL;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
const app = express();

//routes are initilized
const router = express.Router();
routes.init(router);

app.use(cors());
app.use(bodyParser.json());
app.use(app.router);
routes.initialize(app);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
