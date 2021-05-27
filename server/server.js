const express = require("express");
const passport = require("passport");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
require("./passport");

const apiRouter = require("./routes/api");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const PORT = 3000;

app.use(cookieParser());
app.use(cookieSession({
  name: "session-name",
  keys: ["key1", "key2"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use("/build", express.static(path.join(__dirname, "../build")));
  app.get("/", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
  });
}

app.use("/api", apiRouter);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    successRedirect: "/",
  }),
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  },
);

const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

const verify = async (req, res, next) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload;
  const userid = payload["sub"];
  return next();
};

app.get("/profile", checkUserLoggedIn, (req, res) => {
  res.send(`<h1>${req.user.emails[0].value}</h1>`);
});

app.use((err, req, res, next) => {
  const defaultErr = {
    log: "unknown middleware error has occurred",
    status: 500,
    message: { err: "an error has occurred" },
  };
  const errorObj = { ...defaultErr, err };
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;