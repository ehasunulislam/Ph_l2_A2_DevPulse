import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";
import { pool } from "../../db/index.db.js";

// =========================
// create Issue functionality
// =========================
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


// =========================
// getAll Issue 
// =========================
const getAllIssue = async(  req: Request, res: Response) => {
    try{
        const result = await issueService.getAllIssuesFromDB(req.query);

        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
}


// =========================
// getAll issue by single 
// =========================
const getSingleIssue = async (req: Request, res: Response) => {
    try{
        const { id } = req.params;

        const result = await issueService.getSingleIssueFromDB(Number(id));

        res.status(200).json({
            success: true,
            data: result,
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



// =========================
// Update Issue Controller
// =========================
const updateIssue = async(req: Request, res: Response) => {
    try{
        const issueId = Number(req.params.id);

        const user = req.user!;

        const result = await issueService.updateIssueIntoDB(
            issueId,
            req.body,
            user
        );

        res.status(201).json({
            success: true,
            message: "Issue updated successfully",
            data: result,
        });
    }
    catch(err: any) {
        res.status(500).json({
            success: false,
            message: err.message,
            error: err,
        });
    }
}



export const issueController = {
    createIssue,
    getAllIssue,
    getSingleIssue,
    updateIssue
}