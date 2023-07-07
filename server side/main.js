const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const localAuthRouter = require("./routes/localAuth");
const googleAuthRouter = require("./routes/googleAuth");
const facebookAuthRouter = require("./routes/facebookAuth");
const auth = require("./routes/auth");
const MongoStore = require("connect-mongo");
const app = express();
require("dotenv").config({ path: __dirname + "/.env" });
const { dbConnect } = require("./config/dbConnect");
const passport = require("passport");
app.use(
  cors({
    origin: "http://158.180.30.34",
    credentials: true,
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      collectionName: "sessions",
      mongoUrl: "mongodb://127.0.0.1:27017/user",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite:"none",
      domain:"http://158.180.30.34"
    },
  })
);
require("./config/localStrategy")(passport);
require("./config/googleStrategy")(passport);
require("./config/facebookStrategy")(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", localAuthRouter);
app.use("/auth", googleAuthRouter);
app.use("/auth", facebookAuthRouter);
app.use("/auth", auth);
dbConnect()
  .then((res) =>
    app.listen(4000, () => {
      console.log("http://localhost:4000");
    })
  )
  .catch((err) => console.log(err));
