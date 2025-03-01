import app from "./app_service.js";
import { createServer } from "http";

const httpServer = createServer(app);

export default httpServer;
