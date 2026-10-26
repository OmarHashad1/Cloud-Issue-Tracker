import express from "express";
import * as issueController from "../controllers/issues.js";

const router = express.Router();

router.get("/", issueController.listIssues);
router.post("/", issueController.createIssue);
router.patch("/:id/status", issueController.updateIssueStatus);

export default router;
