const User = require("../model/user");
const path = require("path");

exports.createUser = (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const image = req.file.path;
  User.create({ name, email, phoneNumber, image }).then(() => {
    res.status(200).json({ message: "User is created" });
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: req.file.path,
      },
    },
    { new: true }
  )
    .then((data) => {
      res.status(200).json({ message: "User data is updated", data });
    })
    .catch((err) => console.error(err));
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "User data is deleted" }))
    .catch((err) => console.error(err));
};

exports.getUser = (req, res) => {
  User.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.error(err));
};

exports.getUserById = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.error(err));
};
