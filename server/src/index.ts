import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { magazineRoutes } from "./routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(magazineRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT} 🚀`);
});
