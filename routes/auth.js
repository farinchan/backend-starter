const router = require("express").Router()
const { connection, mysql } = require("../config/database/mysql")
const validation = require("../helpers/validation")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");



router.post('/register', async (req, res) => {

    //validation Data Check Before create new user
    const validationError = validation.registerValidation(req.body).error
    if (validationError) return res.status(400).json({ message: validationError.details[0].message })

    // check if email is already in databases
    connection.query("SELECT email FROM users  WHERE email =" + mysql.escape(req.body.email), async (err, result) => {
        if (typeof result[0] !== "undefined") {
            res.status(400).json({ message: "email already exist" })
        } else {

            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashingPassword = await bcrypt.hash(req.body.password, salt)

            //create a new user in a database
            const name = mysql.escape(req.body.name)
            const email = mysql.escape(req.body.email)
            const password = hashingPassword
            connection.query(`INSERT INTO users (name, email, password) VALUES (${name},${email},"${password}")`, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ err })
                } else {
                    res.json({
                        message: "User added successfully",
                        result
                    })
                }
            });

        }
    })

});

router.post('/login', async (req, res) => {

    //validation Data Check Before create new user
    const validationError = validation.loginValidation(req.body).error
    if (validationError) return res.status(400).json({ message: validationError.details[0].message })

    connection.query("SELECT * FROM users  WHERE email =" + mysql.escape(req.body.email), async (err, result) => {
        if (typeof result[0] === "undefined" || result[0].email != req.body.email) {
            res.status(400).json({ message: "Email or password wrong!" })
        } else {

            // //check password
            const validPassword = await bcrypt.compare(req.body.password, result[0].password)
            if (!validPassword) return res.status(400).json({ message: "Email or password wrong!" })

            //create an assign a token
            const token = jwt.sign({ id_user: result[0].id_user }, process.env.TOKEN_SECRET)
            res.header("auth-token", token)

            res.json({
                messsage: "loggedd In ",
                token: token,
                name: result[0].name,
                email: result[0].email
            });

        }
    })

});

module.exports = router