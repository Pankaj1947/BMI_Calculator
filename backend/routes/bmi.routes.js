const { Router } = require("express");
const bmiRouter = Router();
const BmiModel = require("../models/bmi");
const jwt = require("jsonwebtoken");


bmiRouter.get("/:userId/bmi", async (req, res) => {
    const userId = req.params.userId;
    const token=req.headers["authorization"].split(" ")[1];
    const verifyToken=jwt.verify(token,"secretkey");
    console.log(verifyToken);
    const bmi = await BmiModel.find({ userId })
    res.send(bmi);
})

bmiRouter.post("/:userId/bmi", async (req, res) => {
    const userId = req.params.userId;
    let payload = {
        ...req.body, userId,
    }
    const bmi = await new BmiModel(payload)
    bmi.save((err, success) => {
        if (err) {
            return res.status(500).send({ message: "Something Went Wrong" })
        }
        console.log(success);
        return res.status(201).send(success)
    })
})


module.exports = bmiRouter;