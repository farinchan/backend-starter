const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
// import auth routes
const authRoutes = require("./routes/auth")
const exampleRoutes = require("./routes/example")

require("./config/database/mysql")

//dotenv (.env) config
dotenv.config()

//middleware
app.use(bodyParser.json());
// app.use(express.json)

//routes middleware
app.use("/api/user", authRoutes)
app.use("/api/example", exampleRoutes)

app.listen(3000, () => {
    console.log("Server is running on example http://localhost:3000");
});
