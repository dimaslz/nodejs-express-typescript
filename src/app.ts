import express from "express";
import compression from "compression";  // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import mongo from "connect-mongo";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

console.log("NODE_ENV", process.env.NODE_ENV)

// Controllers (route handlers)
import * as homeController from "./controllers/home";
import userController from "./controllers/user.controller";


// Create Express server
const app = express();

const corsOptions = {
	origin: "*",
	// allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
	methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH", "HEAD"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Connect to MongoDB
if (process.env.NODE_ENV !== "test") {
    const MongoStore = mongo(session);
    const mongoUrl = MONGODB_URI;
    mongoose.Promise = bluebird;
    
    mongoose.connect(mongoUrl, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true 
    }).then(
        () => { 
            /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
            console.log("MongoDB connected!");
        },
    ).catch(err => {
        console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
        // process.exit();
    });
    app.use(session({
        resave: true,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        store: new MongoStore({
            url: mongoUrl,
            autoReconnect: true
        })
    }));
}

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes.
 */
app.get("/", homeController.index);
// app.post("/", homeController.index);
app.use("/users", userController);

export default app;
