const express = require("express");
const cors = require("cors");
const router = express.Router();
const user = require("../controller/user");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), cors(), user.createUser);
router.put("/:id", upload.single("image"), user.updateUser);
router.delete("/:id", user.deleteUser);
router.get("/", user.getUser);
router.get("/:id", user.getUserById);

module.exports = router;
