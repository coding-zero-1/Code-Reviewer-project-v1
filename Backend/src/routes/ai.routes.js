const express = require("express")
const router = express.Router()
const aiController = require("../controllers/ai.controller")
const auth = require("../middlewares/auth")

router.post("/get-review",auth,aiController.getReview)

module.exports = router