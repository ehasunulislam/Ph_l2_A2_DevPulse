import { Router } from "express";
import { issueController } from "./issue.controller.js";
import auth from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", auth("contributor", "maintainer"), issueController.createIssue)
router.get("/", issueController.getAllIssue);
router.get("/:id", issueController.getSingleIssue);

export const issueRouter = router;