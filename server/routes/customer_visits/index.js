import express from "express";
import addCustomer from "../../controllers/customer_visits/create_customer_visit.js";
import getCustomerVisits from "../../controllers/customer_visits/get_customer_visits.js";
import { limiter } from "../../middleware/rateLimiter.js";
import { authenticateToken } from "../../middleware/verify.js";
import getCustomer from "../../controllers/customer_visits/get_customer.js";
const router = express.Router();

router.post("/", limiter, addCustomer);
router.get("/:id", limiter, authenticateToken, getCustomerVisits);
router.get("/customer/:id", limiter, authenticateToken, getCustomer);
export { router };
