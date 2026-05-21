import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";

// create Issue functionality
const createIssue = async(req: Request, res: Response) => {
    try{
        const reporter_id = req.user!.id;

        const result = await issueService.createIssueIntoDB(
            req.body,
            reporter_id
        );

        res.status(201).json({
            success: true,
            message: "Issue created successfully",
            data: result
        });
    }
    catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
};

export const issueController = {
    createIssue
}