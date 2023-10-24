const express = require("express")
const { Pool } = require("pg")
    // for the purpose of this course
const pool = new Pool({
    connectionString: "postgres://postgres:mysecretpassword@localhost:5432/message_boards",
})

async function init() {
    const app = express()

    app.get("/", async(req, res) => {
        const client = await pool.connect()

        const [commentRes, boardRes] = await Promise.all([
            client.query(
                "SELECT * FROM comments NATURAL LEFT JOIN  rich_content WHERE board_id =$1", [req.query.search]
            ),
            client.query("SELECT * FROM boards WHERE board_id =$1", [
                req.query.search,
            ]),
        ])

        res.json({
            status: "ok",
            board: boardRes.rows[0] || {},
            post: commentRes.rows || [],
        })
    })
}

init()