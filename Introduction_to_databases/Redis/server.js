const { promisify } = require("util")
const express = require("express")
const redis = require("redis")
const client = redis.createClient()
    // redis incur, a function that performs incur operations on redis database
const rIncr = promisify(client.incr).bind(client)

async function init() {
    const app = express()
    app.use(express.static("./static"))

    app.get("/pageview", async(req, res) => {
        // key name "pageviews" going to redis as KEYS
        const views = await rIncr("pageviews")

        res.json({
            status: 200,
            views,
        })
    })

    const PORT = 3000

    app.listen(PORT, () => console.log("server listening on port" + PORT))
}

init()