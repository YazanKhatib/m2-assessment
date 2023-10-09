import { Router } from "express";
import { addMagazine, deleteMagazine, getMagazines, updateMagazine } from "../controllers";

const router = Router();

router.post("/magazine", addMagazine);
router.get("/magazine", getMagazines);
router.patch("/magazine/:id", updateMagazine);
router.delete("/magazine/:id", deleteMagazine);

export { router as magazineRoutes };
