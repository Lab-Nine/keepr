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

router.get(
  "/itemsInPossession",
  controllers.getUserId,
  controllers.getItemsInPossession,
  (req, res) => {
    res.status(200).json(res.locals.itemsInPossession);
  },
);

router.get(
  "/itemsLent",
  controllers.getUserId,
  controllers.getLentItems,
  (req, res) => {
    res.status(200).json(res.locals.itemsLent);
  },
);

router.get(
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

router.get(
  "/search",
  controllers.searchUser,
  controllers.getItemsInPossession,
  (req, res) => {
    res.status(200).json(res.locals.itemsInPossession);
  },
);

module.exports = router;
