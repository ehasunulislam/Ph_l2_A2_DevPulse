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


// getAll Issues functionality
const getAllIssuesFromDB = async(query: any) => {
    const {
        sort = "newest",
        type,
        status
    } = query

    let sql = `SELECT * FROM issues`;
    const conditions: string[] = [];
    const values: any[] = [];

    // filtering
    if(type) {
        values.push(type)
        conditions.push(`type=$${values.length}`)
    }

    if(status) {
        values.push(status)
        conditions.push(`status=$${values.length}`)
    }

    // add WHERE
    if(conditions.length > 0) {
        sql += ` WHERE ` + conditions.join(" AND ")
    }

    // sorting
    if(sort === "oldest") {
        sql += ` ORDER BY created_at ASC `
    } else {
        sql += ` ORDER BY created_at DESC `
    }

    // fetch issues
    const issuesResult = await pool.query(
        sql,
        values
    )

    const issues = issuesResult.rows;

    // final 
    const finalIssues = [];

    for(const issue of issues) {
        const reporterResult = await pool.query(
            `
                SELECT id, name, role
                FROM users
                WHERE id=$1
            `, [issue.reporter_id]
        );

        finalIssues.push({
            id: issue.id,
            title: issue.title,
            description: issue.description,
            type: issue.type,
            status: issue.status,

            reporter: reporterResult.rows[0],

            created_at: issue.created_at,
            updated_at: issue.updated_at,
        });
    }

    return finalIssues;
}


// get single issue functionality
const getSingleIssueFromDB = async(id: number) => {
    /* find the issue */
    const issueResult = await pool.query(
        `
        SELECT * FROM issues 
        WHERE id=$1
        `, [id]
    );

    // not found
    if (issueResult.rows.length === 0) {
        throw new Error("Issue not found");
    }

    const issue = issueResult.rows[0];

    // reporter find
    const reporterResult = await pool.query(`
        SELECT id, name, role
        FROM users 
        WHERE id=$1
        `, [issue.reporter_id]
    );

    // final response
    return{
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporterResult.rows[0],

        created_at: issue.created_at,
        updated_at: issue.updated_at,
    }
}


export const issueService = {
    createIssueIntoDB,
    getAllIssuesFromDB,
    getSingleIssueFromDB
}