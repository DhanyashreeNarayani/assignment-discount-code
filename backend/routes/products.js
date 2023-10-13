const Route = require('express').Router();
const path = require('path');
const fs = require('fs');

const productsFilePath = `${path.resolve('../backend/model/products.json')}`;


Route.get('/', (req, res) => {
    const rawData = fs.readFileSync(productsFilePath);
    const products = JSON.parse(rawData);
    return res.status(200).json({
        status: 'success',
        data: {
            products
        }
    })
})


module.exports = Route;