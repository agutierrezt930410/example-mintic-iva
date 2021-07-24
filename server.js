import express from "express";
import http from "http";
import healthcheckRoutes from "./routes/healthcheck.js";
import usersRoutes from "./routes/users.js";
import dbConnection from "./db/index.js";

const app = express();
const PORT = process.env.PORT || 3000;
let server;

/**
 * Application middlewares
 */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * Routes
 */
app.use("/", healthcheckRoutes);
app.use("/api/v1/users", usersRoutes);

server = http.Server(app);
await dbConnection("mongodb://localhost:27017/example");
server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
export default server;
