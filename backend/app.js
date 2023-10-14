const express = require('express');
const bodyParser = require('body-parser');
const adminRoute = require('./routes/admin');
const productsRoute = require('./routes/products');

const app = express();
const port = 4000;

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminRoute);
app.use('/products', productsRoute);


app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});