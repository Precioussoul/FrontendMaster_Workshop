const { promisify } = require("util")
const express = require("express")
const redis = require("redis")
const client = redis.createClient()
    // redis incur, a function that performs incur operations on redis database
const rIncr = promisify(client.incr).bind(client)
const rGet = promisify(client.get).bind(client)
const rSetex = promisify(client.setex).bind(client)

function cache(key, ttl, slowFn) {
    return async function cacheFn(...props) {
        const cachesResponse = await rGet(key)
        if (cachesResponse) {
            return cachesResponse
        }

        const result = await slowFn(...props)
        await rSetex(key, ttl, result)
        return result
    }
}

async function verySlowAndExpensivePostgresSQLQuery() {
    // todo here, you would write your postgres query

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(new Date().toUTCString())
        }, 10000)
    })

    return promise
}

const cacheFn = cache(
    "expensive_call",
    10,
    verySlowAndExpensivePostgresSQLQuery
)

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

    app.get("/get", async(req, res) => {
        const data = await cacheFn()

        res
            .json({
                status: 200,
                data,
            })
            .end()
    })

    const PORT = 3000

    app.listen(PORT, () => console.log("server listening on port" + PORT))
}

init()