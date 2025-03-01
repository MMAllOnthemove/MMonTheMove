import { Queue } from "bullmq";

export const taskQueue = new Queue("taskQueue", {
    redis: { host: "localhost", port: 6379 },
});
