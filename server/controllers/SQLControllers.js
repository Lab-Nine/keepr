const db = require("../models/allModels");

const controllers = {};

controllers.userLogin = (req, res, next) => {
  res.cookie("userOauthId", req.body.oauth);
  const checkArr = [req.body.oauth];
  const loginCheck = "SELECT * FROM users " +
    "WHERE oauth=$1;";
  db.query(loginCheck, checkArr)
    .then((data) => {
      res.locals.users = data.rowCount;
      return next();
    })
    .catch((err) => console.log(err));
};

controllers.createUser = (req, res, next) => {
  if (res.locals.users !== 0) return next();
  const valuesArr = [req.body.oauth, req.body.username];
  const newUserRequest = "INSERT INTO Users " +
    "(oauth, username) " +
    "VALUES ($1, $2);";
  db.query(newUserRequest, valuesArr)
    .then((data) => {
      res.locals.newUser = data;
      return next();
    })
    .catch((err) => console.log(err));
};

controllers.getUserId = (req, res, next) => {
  let userIdArr;
  let userIdRequest
  if (req.body.username) {
    userIdArr = [req.body.username];
    userIdRequest = "SELECT userid FROM users WHERE username = $1;";
  } else {
    userIdArr = [req.cookies.userOauthId];
    userIdRequest = "SELECT userid FROM users WHERE oauth = $1;";
  }
  db.query(userIdRequest, userIdArr)
    .then((data) => {
      const userIdObj = data.rows[0];
      res.locals.userId = userIdObj.userid;
      return next();
    })
    .catch((err) => console.log(err));
};

controllers.newItem = (req, res, next) => {
  const newItemValues = [
    res.locals.userId,
    req.body.name,
    req.body.desc,
  ];
  const newItemRequest = "INSERT INTO Things " +
    "(ThingOwnerID, ThingName, ThingDescription) " +
    "VALUES ($1,$2,$3);";
  db.query(newItemRequest, newItemValues)
    .then((data) => {
      return next();
    });
};

controllers.getItemsInPossession = (req, res, next) => {
  const getItemsValues = [res.locals.userId];
  const getItemsRequest =
    "SELECT Things.ThingName, Things.ThingDescription, Things.ThingID " +
    "FROM Things LEFT OUTER JOIN Transactions " +
    "ON Things.ThingID = Transactions.ThingID " +
    "WHERE Things.ThingOwnerID=$1 AND Transactions.TransactionID IS NULL;";
  db.query(getItemsRequest, getItemsValues)
    .then((data) => {
      res.locals.itemsInPossession = data.rows;
      return next();
    })
    .catch((err) => console.log("inposs err: ", err));
};

controllers.getLentItems = (req, res, next) => {
  const getLentValues = [res.locals.userId];
  const getItemsRequest =
    "SELECT Things.ThingName, Things.ThingDescription, Transactions.StartDate, Users.UserName " +
    "FROM Transactions INNER JOIN Things ON Things.ThingID = Transactions.ThingID " +
    "INNER JOIN Users ON Transactions.userID = Users.UserID " +
    "WHERE Things.ThingOwnerID=$1 AND Transactions.TransactionID IS NOT NULL;";
  db.query(getItemsRequest, getLentValues)
    .then((data) => {
      res.locals.itemsLent = data.rows;
      return next();
    });
};

controllers.getBorrowedItems = (req, res, next) => {
  const getBorrowedValues = [res.locals.userId];
  const getBorrowedRequest =
    "SELECT Things.ThingName, Things.ThingDescription, Transactions.StartDate, Users.UserName, Things.ThingId " +
    "FROM Things INNER JOIN Transactions ON Things.ThingID = Transactions.ThingID " +
    "INNER JOIN Users ON Things.ThingOwnerId = Users.UserID " +
    "WHERE Transactions.UserID=$1;";
  db.query(getBorrowedRequest, getBorrowedValues)
    .then((data) => {
      res.locals.itemsBorrowed = data.rows;
      return next();
    })
    .catch((err) => console.log("get borrowed items err: ", err));
};

controllers.borrowItem = (req, res, next) => {
  const borrowValue = [req.body.id, res.locals.userId];
  const borrowRequest = "INSERT INTO Transactions " +
    "(ThingID, UserID) " +
    "VALUES ($1,$2);";
  db.query(borrowRequest, borrowValue)
    .then((data) => {
      return next();
    });
};

controllers.returnItem = (req, res, next) => {
  const returnValue = [req.body.id];
  const returnRequest = "DELETE FROM Transactions WHERE ThingID=$1";
  db.query(returnRequest, returnValue)
    .then((data) => {
      return next();
    });
};

controllers.searchUser = (req, res, next) => {
  const searchValue = [req.body.term];
  const searchRequest = "SELECT userid FROM users WHERE UserName = $1;";
  db.query(searchRequest, searchValue)
    .then((data) => {
      if (data.rows.length === 0) res.locals.valid = false;
      else {
        const userIdObj = data.rows[0];
        res.locals.userId = userIdObj.userid;
        res.locals.valid = true;
      }
      return next();
    })
    .catch((err) => console.log(err));
};

module.exports = controllers;