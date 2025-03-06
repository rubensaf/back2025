const express = require("express")
const router = express.Router()
const { validatorCreateItem, validatorGetItem  } =  require("../validators/tracks")
const customHeader = require("../middleware/customHeader")
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks")


router.get("/", getItems)
router.get("/:id", validatorGetItem ,getItem)
//router.put("/:id", updateItem)
//router.delete("/:id", deleteItem)
router.post("/", validatorCreateItem, customHeader, createItem)

module.exports = router
