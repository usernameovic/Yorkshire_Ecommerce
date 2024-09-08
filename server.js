const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

const adminViewRouter = require('./routes/adminViewRoutes');

const adminApiRouter = require('./routes/adminApiRoutes');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const contactMessageRouter = require('./routes/contactMessageRoutes');

const { renderProductPage } = require('./controllers/productController');


app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


async function connectToDatabase() {
    try {
        await mongoose.connect(DB_CONNECTION_STRING);
        console.log('Successfully connected with our database!');
    } catch (error) {
        console.log(error);
    }
}
connectToDatabase();




// website routes
app.use('/admin', adminViewRouter);


// api routes
app.use('/api', adminApiRouter);
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', contactMessageRouter);




app.get('/', (req, res) => {
    res.render('index');
});
app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/about', (req, res) => {
    res.render('about_us');
});
app.get('/profile', (req, res) => {
    res.render('profile');
});
app.get('/product/:id', renderProductPage);


app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
