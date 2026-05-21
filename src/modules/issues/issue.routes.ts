import { Router } from "express";
import { issueController } from "./issue.controller.js";
import auth from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", auth("contributor", "maintainer"), issueController.createIssue)

export const isuueRouter = router;