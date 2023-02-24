const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/comment", require("./auth.comment"));
router.use("/quality", require("./auth.quality"));
router.use("/profession", require("./auth.profession"));
router.use("/user", require("./auth.user"));

module.exports = router;
