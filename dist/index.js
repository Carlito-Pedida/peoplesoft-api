"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = "mongodb://localhost:27017/people_softwareDB";
mongoose_1.default.connect(connectionString).then(() => console.log("database connection successful!"), (err) => console.log("Error connecting to the database", err));
const app = (0, express_1.default)();
const port = process.env.PORT || 4080;
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:4200", "http://localhost:5001"]
};
app.get("/", (_req, res) => {
    return res.send("Express Typescript on Vercel");
});
app.get("/ping", (_req, res) => {
    return res.send("pong 🏓");
});
app.use(cors(corsOptions));
// routes
app.use("/api/employee", employeeRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
app.use((req, res, next) => {
    res.status(404).end();
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map