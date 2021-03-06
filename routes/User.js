const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../passport");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const PurchasedProducts = require("../models/PurchasedProducts");

router.post("/register", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username }, (err, user) => {
    if (err) res.status(500).json(err);
    if (user) res.json("Login jest zajęty");
    else {
      const newUser = new User({ username, password });
      newUser.save(err => {
        if (err) res.status(500).json(err);
        else res.status(201).json("Dodano użytkownika");
      });
    }
  });
});

const signToken = userId =>
  jwt.sign(
    {
      iss: "secret",
      sub: userId,
    },
    "secret"
  );

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { sameSite: true });
      res.json("Użytkownik został zalogowany");
    }
  }
);

router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.json("Użytkownik został wylogowany");
  }
);

router.post(
  "/purchase",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const product = new PurchasedProducts(req.body);

    product.save(err => {
      if (err) res.status(500).json(err);
      else req.user.purchasedProducts.push(product._id);
      req.user.save(err => {
        if (err) res.status(500).json(err);
        else res.json(product);
      });
    });
  }
);

router.get(
  "/purchased-products",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id })
      .populate("purchasedProducts")
      .exec((err, data) => {
        if (err) res.status(500).json(err);
        else res.json(data.purchasedProducts);
      });
  }
);

router.get(
  "/username",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById({ _id: req.user._id }, (err, data) => {
      if (err) res.status(500).json(err);
      else res.json(data.username);
    });
  }
);

module.exports = router;
