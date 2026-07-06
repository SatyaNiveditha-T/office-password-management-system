const router = require("express").Router();

const {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  updateStatus,
  changePassword
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", addUser);
router.put("/:userId", updateUser);
router.put("/:userId/status", updateStatus);
router.post("/:userId/change-password", changePassword);
router.delete("/:userId", deleteUser);

module.exports = router;