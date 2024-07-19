import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./routes/employeeRoutes";
import userRoutes from "./routes/userRoutes";
import mongoose from "mongoose";

const connectionString: string = "mongodb://localhost:27017/people_softwareDB";
mongoose.connect(connectionString).then(
  () => console.log("database connection successful!"),
  (err) => console.log("Error connecting to the database", err)
);

const app = express();
const port = process.env.PORT || 4080;

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:5001"]
};

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.use(cors(corsOptions));

// routes
app.use("/api/employee", employeeRoutes);
app.use("/api/users", userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).end();
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
