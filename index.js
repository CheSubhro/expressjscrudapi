
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const URL = process.env.MONGOURL;

if (!URL) {
    console.error("MongoDB URL is missing in .env file");
    process.exit(1);
}

mongoose
    .connect(URL)
    .then(() => {
        console.log("DB Connection successfully");

        app.use("/api", route);

        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
        process.exit(1);
    });
