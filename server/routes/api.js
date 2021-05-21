const express = require("express");
const controllers = require("../controllers/SQLControllers");
const router = express.Router();

router.post(
  "/oauthLogin",
  controllers.userLogin,
  controllers.createUser,
  (req, res) => {
    res.status(200).send("success");
  },
);

router.post(
  "/addItem",
  controllers.getUserId,
  controllers.newItem,
  (req, res) => {
    res.status(200).send("item added");
  },
);

router.post(
  "/itemsInPossession",
  controllers.getUserId,
  controllers.getItemsInPossession,
  (req, res) => {
    res.status(200).json(res.locals.itemsInPossession);
  },
);

router.post(
  "/itemsLent",
  (req, res, next) => {console.log('hi'); next()},
  controllers.getUserId,
  controllers.getLentItems,
  (req, res) => {
    res.status(200).json(res.locals.itemsLent);
  },
);

router.post(
  "/itemsBorrowed",
  controllers.getUserId,
  controllers.getBorrowedItems,
  (req, res) => {
    res.status(200).json(res.locals.itemsBorrowed);
  },
);

router.post(
  "/borrowItem",
  controllers.getUserId,
  controllers.borrowItem,
  (req, res) => {
    res.status(200).json("borrow successful");
  },
);

router.post(
  "/returnItem",
  controllers.returnItem,
  (req, res) => {
    res.status(200).json("return successful");
  },
);

router.post(
  "/search",
  controllers.searchUser,
  (req, res) => {
    res.status(200).json(res.locals.valid);
  },
);

module.exports = router;
