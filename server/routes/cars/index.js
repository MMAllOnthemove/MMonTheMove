import express from "express";
import addCar from "../../controllers/department/cars/add_car.js";
import getCars from "../../controllers/department/cars/get_cars.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";

const router = express.Router();

router.post("/", limiter, authenticateToken, addCar);
router.get("/", limiter, authenticateToken, getCars);
export { router };
