// console.log("Hello");
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    "mongodb://pkverma07092000:priyanka77@ac-rnpxtfa-shard-00-00.ac7boqz.mongodb.net:27017,ac-rnpxtfa-shard-00-01.ac7boqz.mongodb.net:27017,ac-rnpxtfa-shard-00-02.ac7boqz.mongodb.net:27017/adminbackend?ssl=true&replicaSet=atlas-vj2d3z-shard-0&authSource=admin&appName=Priyanka",
  );
  console.log("Database Connected");
}
// -------------- multer storage --------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// --------------------------------------------

app.use(express.json());
app.use(cors(
  origin = ["http://localhost:5173/", "http://localhost:5174/",
  ],
));


app.use("/api/admin", upload.single("image"), require("./routes/adminRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(
  "/api/product",
  upload.single("image"),
  require("./routes/productRoute"),
);
app.use("/api/reservation", require("./routes/reservationRoute"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
  res.json({ message: "Server Create" });
});


// ----------------------------------------------
app.listen(5000, () => {
  console.log("Server Running");
});
