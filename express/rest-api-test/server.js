import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/error.js";
import posts from "./routes/posts.js";
import notFound from "./middleware/notFound.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/dragunwf", (req, res) => {
  res.send({ message: "DragunWF" });
});

app.use("/api/posts", posts);

app.use(notFound);

app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port ${port}`));
