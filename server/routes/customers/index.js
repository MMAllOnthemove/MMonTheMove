import express from "express";
import getCustomers from "../../controllers/customer_visits/get_customers.js";
import { authenticateToken } from "../../middleware/verify.js";
import { UpdateCustomer } from "../../controllers/customer_visits/update_customer.js";
import getCustomerByRSId from "../../controllers/customer_visits/get_customer_by_rs_id.js";
import { limiter } from "../../middleware/rateLimiter.js";
const router = express.Router();

router.get("/", authenticateToken, getCustomers);
router.get("/rs/:id", authenticateToken, getCustomerByRSId);
router.patch("/:id", limiter, authenticateToken, UpdateCustomer);

export { router };
