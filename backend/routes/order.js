const Route = require('express').Router();
const path = require('path');
const fs = require('fs');
const randomstring = require('randomstring');

const n = 3;

const ordersFilePath = `${path.resolve('../backend/model/order.json')}`;
const dicountPath = `${path.resolve('../backend/model/discount.json')}`;
const productsPath = `${path.resolve('../backend/model/products.json')}`;


Route.get('/is-discount-present', (req, res) => {
    const rawData = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(rawData);

    const currentOrder = orders.length + 1;
    let discountCode = ""


    if (currentOrder % n == 0) {
        const rawData = fs.readFileSync(dicountPath);
        const discount = JSON.parse(rawData);
        discountObject = discount.find(item => !item.used)
        discountCode = discountObject?.discountCode || "";

    }

    return res.status(200).json({
        status: 'success',
        data: {
            isDiscountPresent: (discountCode != "" && (currentOrder % n) == 0) ? true : false,
            discountCode
        }
    })



})


Route.post('/checkout', async (req, res) => {
    try {
        const rawData = fs.readFileSync(ordersFilePath);
        const orders = JSON.parse(rawData);
        const currentOrder = orders.length + 1;
        const { user, orderedItems } = req.body;
        let totalAmount = orderedItems.reduce((accumulator, currentValue) => {
            return (currentValue.amount * currentValue.price) + accumulator
        }, 0)

        if (user.discount && currentOrder % n == 0) {
            const rawData = fs.readFileSync(dicountPath);
            const discount = JSON.parse(rawData);
            let discountAmount = 0;
            discountObjectIndex = discount.findIndex(item => item.discountCode == user.discount);

            if (discountObjectIndex > -1 && !discount[discountObjectIndex].used) {
                discountAmount = totalAmount * (10 / 100);
                totalAmount = totalAmount - discountAmount;
                console.log(totalAmount, "TotalAmount", discountAmount)
                req.body.discountAmount = discountAmount;
                discount[discountObjectIndex] = {
                    discountCode: discount[discountObjectIndex].discountCode,
                    used: true
                }
                fs.writeFileSync(dicountPath, JSON.stringify(discount, null, 4))

            }

        }

        req.body.orderValue = totalAmount;

        orders.push(req.body);

        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 4))


        console.log(req.body);
        res.status(200).json({
            status: "success"
        })


    } catch (error) {

    }
})

Route.get('/analytics', (req, res) => {
    const rawDataProducts = fs.readFileSync(productsPath);
    const products = JSON.parse(rawDataProducts);
    const rawDataOrders = fs.readFileSync(ordersFilePath);
    const orders = JSON.parse(rawDataOrders);
    const rawDataDiscountCodes = fs.readFileSync(dicountPath);
    const discount = JSON.parse(rawDataDiscountCodes);
    const totalProductsCount = {};
    let totalAmount = 0;
    let totalAmountBeforeDiscount = 0;
    orders.forEach(order => {
        order.orderedItems.forEach(item => {
            totalAmountBeforeDiscount += (item.price * item.amount);
            if (totalProductsCount[item.productId]) {
                totalProductsCount[item.productId] += item.amount
            } else {
                totalProductsCount[item.productId] = item.amount
            }


        })
        totalAmount += order.orderValue
    })

    return res.status(200).json({
        status: 'success',
        data: {
            totalProductsCountById: totalProductsCount,
            totalPurchaseAmount: totalAmount,
            discountCodes: discount,
            totalDiscountAmount: totalAmountBeforeDiscount - totalAmount,
        }
    })

})


module.exports = Route;

