const express = require("express");
const router = express.Router({ mergeParams: true });

router.get("/user", async (req, res) => {});

router.patch("/user/:id", async (req, res) => {});

module.exports = router;
