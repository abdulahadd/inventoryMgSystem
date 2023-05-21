const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const Sale = require('../models/sales');

router.post('/addInventory', (req, res) => {
    Stock.find({ modelNo: req.body.modelNo }, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            if (data.length !== 0) {
                res.json({
                    msg: 'Model# Already In Stock',
                })
            } else {
                const obj = new Stock({
                    name: req.body.name,
                    supplier: req.body.supplier,
                    color: req.body.color,
                    total_products: req.body.total_products,
                    modelNo: req.body.modelNo,
                    cost: req.body.cost,
                    date: req.body.date
                });

                obj.save((err, added) => {
                    if (err) {
                        console.log(err)
                        res.json({
                            success: false,
                        })
                    }
                    else {
                        res.json({
                            success: true
                        })
                    }
                })
            }
        }
    });


})
router.post('/getInventory', (req, res) => {
    if (req.body.token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68') {

        Stock.find(function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });

    } else {
        res.json('error');

    }

});


router.post('/getSale', (req, res) => {
    if (req.body.token == 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTM0OTMzNTY2LCJleHAiOjE1MzUwMTk5NjZ9.3xOdoxpK8hb42ykjMIl6rwLafB63Y-EQNOO9fFamp68') {

        Sale.find(function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });

    } else {
        res.json('error');

    }

});


router.put('/deleteInventory', (req, res, next) => {


    Stock.deleteOne({ _id: req.body._id }, function (err, result) {
        if (err) {
            res.json({ success: false });
        } else {
            res.json({ success: true });

        }
    })
})

router.put('/deleteSale', (req, res, next) => {

    console.log(req.body)
    Stock.find({ _id: req.body.id }, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            console.log(data)

            var tp = data[0].total_products + req.body.quantity;
            Stock.findByIdAndUpdate(req.body.id, {
                $set: {
                    total_products: tp
                }
            }, {
                new: true
            },
                function (err, result) {
                    if (err) {

                        res.json(err);
                    }
                    else {

                        Sale.deleteOne({ _id: req.body._id }, function (err, result) {
                            if (err) {
                                res.json({ success: false });
                            } else {
                                res.json({ success: true });

                            }
                        })


                    }

                }
            )

        }
    });



})

router.post('/addSale', (req, res) => {
    Sale.find({ modelNo: req.body.modelNo }, function (err, data) {
        if (err) {
            res.json(err);
        }
        else {
            Stock.findByIdAndUpdate(req.body.id, {
                $set: {
                    total_products: req.body.total_products
                }
            }, {
                new: true
            },
                function (err, result) {
                    if (err) {

                        res.json(err);
                    }
                    else {
                        const obj = new Sale({
                            userName: req.body.userName,
                            userID: req.body.userID,
                            productName: req.body.productName,
                            quantity: req.body.quantity,
                            price: req.body.price,
                            cost: req.body.cost,
                            profit: req.body.profit,
                            date: req.body.date,
                            id: req.body.id
                        });

                        obj.save((err, added) => {
                            if (err) {
                                console.log(err)
                                res.json({
                                    success: false,
                                })
                            }
                            else {
                                res.json({
                                    success: true
                                })
                            }
                        })
                    }

                }
            )


        }
    });


})



module.exports = router;
