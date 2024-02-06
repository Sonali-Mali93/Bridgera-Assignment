const User = require("../model/user");
const path = require("path");

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    let image;

    // Check if req.file is available (image uploaded)
    if (req.file) {
      // Get the file path from req.file
      const imagePath = req.file.path;
      // Store the file path in the image variable
      // image = imagePath;
      image = `C:/Users/sonali/Bridgera_Assignment/backend/${imagePath}`;
      console.log(image);
    }

    // Create the user with the image file path
    await User.create({ name, email, phone, image });

    res.status(200).json({ message: "User is created" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// exports.createUser = (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   const phoneNumber = req.body.phoneNumber;
//   const image = req.file.path;
//   if(re.file){
//     imagePath = `C:/Users/sonali/Bridgera_Assignment/backend/${req.file.path}`
//   }
//   User.create({ name, email, phoneNumber, image }).then(() => {
//     res.status(200).json({ message: "User is created" });
//   });
// };

exports.updateUser = (req, res) => {
  let image;
  // Check if req.file is available (image uploaded)
  if (req.file) {
    // Get the file path from req.file
    const imagePath = req.file.path;
    // Store the file path in the image variable
    // image = imagePath;
    image = `C:/Users/sonali/Bridgera_Assignment/backend/${imagePath}`;
    console.log(image);
  }
  User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        image: image,
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
