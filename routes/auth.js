const express = require("express")
const { matchedData } = require("express-validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { usersModel } = require("../models/nosql")
const { tokenSign } = require("../utils/handleJwt")
const { loginCtrl } = require("../controllers/auth");


const router = express.Router()
const { validatorRegister, validatorLogin } = require("../validators/auth")
// Posteriormente, llevaremos la lógica al controller
router.post("/register", validatorRegister, async (req, res) => {
    req = matchedData(req)
    const password = await encrypt(req.password)
    const body = { ...req, password } // Con "..." duplicamos el objeto y le añadimos o sobreescribimos una propiedad
    const dataUser = await usersModel.create(body)
    dataUser.set('password', undefined, { strict: false })
    const data = {
        token: await tokenSign(dataUser),
        user: dataUser
    }
    res.send(data)
})

router.post("/login", validatorLogin, loginCtrl)
module.exports = router