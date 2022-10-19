const { Router } = require("express");
const UserModel = require("../models/user")
const jwt=require("jsonwebtoken");

const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
    console.log(req.body);
    const user = await new UserModel(req.body);
    user.save((err, success) => {
        if (err) {
            res.status(500).send({ message: "Error Occured" })
        }
        return res.status(201).send({ message: "Signup Successfully", token: 54321 })
    });
})

authRouter.post("/login", async (req, res) => {
    console.log(req.body);
    const checkUser = await UserModel.find(req.body);
    const token=jwt.sign({
        id:checkUser._id,
        email:checkUser.email,
        name:checkUser.name
    },"secretkey")
    if (checkUser.length && req.body.password === checkUser[0].password) {
      let { name, _id } = checkUser[0];
      let payload = {
        _id,
        name,
        token,
      };
      res.send(payload);
    } else {
      res.send({ message: "Wrong Credentials" });
    }

})
authRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const user = await UserModel.findOne({ _id: userId })
    res.send(user);
})
//   const userId = req.params.userId;
//   const token = req.headers["authorization"].split(" ")[1];
//   const verifyToken = jwt.verify(token, "secretkey");
//   console.log(verifyToken);
//   const profile = await UserModel.find({ userId });
//   res.send(profile);
// });
authRouter.get("/logout", async (req, res) => {
    const token=req.headers["authorization"].split(" ")[1];
    const verifyToken=jwt.verify(token,"secretkey");
    console.log(verifyToken);
    res.send({ message: "Logout Successfully" })
})


module.exports = authRouter;