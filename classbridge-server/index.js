const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000; // fallback to 5000 if PORT is not defined
require("./db");

const allowedOrigins = [process.env.FRONTEND_URL]; // Add more origins as needed

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(
  cookieParser({
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure cookies in production
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true,
  })
);

const authRoutes = require("./routes/authRoutes");
const classroomRoutes = require("./routes/classroomRoutes");

app.use("/auth", authRoutes);
app.use("/class", classroomRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/getuserdata", (req, res) => {
  res.send("Faysal Mahmud , 26 , Male");
});

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`ClassBridge backend app listening on port ${port}`);
});
