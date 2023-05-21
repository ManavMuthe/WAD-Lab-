const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Connect to MongoDB
mongoose
  .connect("mongodb://0.0.0.0:27017/mycrudapi")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define a mongoose schema for the data

const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// Create a mongoose model based on the schema
const User = mongoose.model("User", userSchema);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API to create an item
app.post("/api/new-user", (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// API to get all items
app.get("/api/get-user", (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// API to get a single item by ID
// app.get('/api/items/:id', (req, res) => {
//   Item.findById(req.params.id)
//     .then(item => {
//       if (!item) {
//         res.status(404).json({ error: 'Item not found' });
//       } else {
//         res.json(item);
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: err.message });
//     });
// });

// API to update an item
app.put("/api/update-user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// API to delete an item
app.delete("/api/delete-user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "Item not found" });
      } else {
        res.json({ message: "Item deleted" });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
