const express = require("express");
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");

app.use(cors());
app.use(express.json());

const serviceAccount = require("./src/app/user-764be-firebase-adminsdk-91ka8-3962332c64.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://user-764be-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

app.get("/get", (req, res) => {
  res.send("GET /get route works");
});

app.post("/test", (req, res) => {
  res.send("POST /test route works");
});

// add user
app.post("/adduser", async (req, res) => {
  const { firstname, lastname, age } = req.body;

  if (!firstname || !lastname || !age) {
    return res
      .status(400)
      .json({ error: "Please provide firstname, lastname, and age" });
  }

  try {
    const newUserRef = await db.collection("users").add({
      firstname,
      lastname,
      age,
    });

    res
      .status(201)
      .json({ message: "User added successfully", id: newUserRef.id });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Endpoint to get all users with pagination
app.get("/users", async (req, res) => {
  const { page = 1, pageSize = 15 } = req.query;
  const startAt = (page - 1) * pageSize;

  try {
    const snapshot = await db.collection("users").orderBy("firstname").offset(startAt).limit(Number(pageSize)).get();
    if (snapshot.empty) {
      return res.status(404).json({ message: "No users found" });
    }

    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});


// Delete user by ID
app.delete("/deleteuser/:id", async (req, res) => {
  const userId = req.params.id; // รับ user id จาก params

  try {
    const userRef = db.collection("users").doc(userId);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "User not found" });
    }

    await userRef.delete();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
});


app.listen("3005", () => {
  console.log("server is running on port 3005");
});
