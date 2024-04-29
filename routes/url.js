const express = require("express");
const { handleGenerateShortURL, handleGetOriginalURL, handleGetAnalytics } = require("../controller/url");
const router = express.Router();

router.route("/").post(handleGenerateShortURL);
router.route("/analytics").get(handleGetAnalytics);
router.route("/:shortId").get(handleGetOriginalURL)


module.exports = router;