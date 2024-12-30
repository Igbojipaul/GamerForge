const express = require("express")

const { getSearchedProducts } = require("../../controllers/shopRoutes/searchController")


const router = express.Router()

router.get("/:keyword", getSearchedProducts)


module.exports = router