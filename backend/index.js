const express = require('express');
const connection = require("./db")
const cors = require("cors")

const authRouter = require("./routes/auth.routes")
const bmiRouter = require("./routes/bmi.routes")

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter)
app.use("/user", bmiRouter)

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log('error:', error)
    }
    console.log("listening to 8080");
})