const express = require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/user')

//Creating user signup
router.post('/signup', async (req, res) => {
    const bcryptPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcryptPassword,
    });

    try {
        await user.save(() => {
            res.status(201).json({ message: "user registered successfully" })
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

//user sign in 
router.post('/signin', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email });
        if (user && user.length > 0) {
            const checkValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (checkValidPassword) {
                //generate jwt token
                const token = jwt.sign({
                    username: user[0].name,
                    useId: user[0]._id
                }, process.env.JWT_SECRET, {
                    expiresIn: '2h'
                });

                res.status(200).json({
                    token: token,
                    message: "login successful!!!"
                })

            } else {
                res.status(401).json({ message: "Authentication Failed!!" })
            }
        } else {
            res.status(401).json({ message: "Authentication Failed!!" })
        }
    } catch {
        res.status(401).json({ message: "Authentication Failed!!" })
    }

})


module.exports = router