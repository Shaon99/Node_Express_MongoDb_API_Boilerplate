require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const productHandler = require('./route/productHandler')
const userHandler = require('./route/userHandler')
const authMiddleware = require('./middlewares/authMiddleware')

const app = express()

//ACEPT ONLY JSON
app.use(express.json())

app.use(cors());

//ALL OBJECT TRUE
app.use(express.urlencoded({ extended: true }));

//DATABASE CONNECTION
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('connection successfully'))
    .catch((err) => console.log(err))

//ROUTE
app.use('/products', authMiddleware, productHandler)
app.use('/', userHandler)


const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err });
}

app.use(errorHandler);


//LISTEN
app.listen(process.env.PORT, () => console.log(`Rest Api app listening on port ${process.env.PORT}!`))