const express = require('express');
const Route = express.Router();
const path = require('path');
const fs = require('fs');

const discountFilePath = `${path.resolve('../backend/model/discount.json')}`;

Route.post('/generate-discount-code', (req, res, next) => {
    const { discountCode } = req.body;
    const rawData = fs.readFileSync(discountFilePath);

    const discountData = JSON.parse(rawData);
    const discountCodeAlreadyPresent = discountData.find(item => { return item.discountCode == discountCode })

    if (discountCodeAlreadyPresent) {
        return res.status(400).json({
            status: "error",
            data: {
                message: 'Discount Already Present'
            }
        })
    }

    const newDiscount = {
        discountCode,
        used: false

    }

    discountData.push(newDiscount);

    const newDiscountList = JSON.stringify(discountData, null, 4);
    fs.writeFileSync(discountFilePath, newDiscountList)


    return res.status(200).json({
        status: 'success'
    })
});




module.exports = Route;
