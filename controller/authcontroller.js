const Authmodel = require("../models/Authmodel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY



async function SIGNUP_NEW_USER(req, res, next) {
    try {
        // check if the user is already exists
        const existingUser = await Authmodel.findOne({ email: req.body.email })
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: 'This email is already exist! please enter valid email',
                data: existingUser.email
            })
        }

        if (req.body.password) {
            bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
                if (hash) {
                    // create new user via authmodel
                    const NEW_USER = new Authmodel({ ...req.body, password: hash });

                    //save created user
                    const SAVE_USER = await NEW_USER.save();
                    return res.status(200).json({
                        success: true,
                        message: 'Account created successfully',
                        data: SAVE_USER
                    })
                }
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}


async function LOGIN_USER(req, res, next) {
    /**
     * Get the data from request object
     * Check whether given email is available in the database
     * If account is available then store the account data temporarily in the variable
     * If user account is not in the database, then respond user accordingly
     * Check for the password equality and response accordingly
     */
    const { email, password } = req.body;
    try {
        const response = await Authmodel.findOne({ email });
        if (response && response._id) {
            bcrypt.compare(password, response.password).then(function (result) {
                if (result) {
                    const token = jwt.sign(
                        {
                            role: response.roles,
                            uid: response._id
                        },
                        secret,
                        {
                            expiresIn: '10h', // expires in 10hours
                        }
                    );
                    // GENERATE JWT TOKEN AND SEND IT IN RESPONSE BODY
                    return res.status(200).json({
                        success: true,
                        message: "Account sign in successful",
                        token: token,
                        data: response
                    });
                } else {
                    res.status(401).json({
                        success: false,
                        message: "Email ID or Password is wrong",
                    });
                }
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Account does not exists",
                token: null,
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}



async function GET_ALL_USERS(req, res, next) {
    try {
        const Users = await Authmodel.find();
        if (Users.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Users fetched successfully",
                data: Users
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "No users found!",
                data: [],
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}


module.exports = {
    SIGNUP_NEW_USER,
    LOGIN_USER,
    GET_ALL_USERS
}