import { pool } from "../../db/index.db.js";
import type { Interface_of_issue } from "./issue.intrface.js";

// Create Issue
const createIssueIntoDB = async(payload: Interface_of_issue, reporter_id: number) => {
    const { title, description, type } = payload;

    const result = await pool.query(`
            INSERT INTO issues
            (title, description, type, reporter_id)

            VALUES($1, $2, $3, $4)

            RETURNING *
        `, [title, description, type, reporter_id]
    )

    return result.rows[0]
};


export const issueService = {
    createIssueIntoDB
}