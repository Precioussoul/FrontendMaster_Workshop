import express from "express"

const app = express()

app.get("/", (req, res) => {
  res.json({msg: "hello world"})
})

export default app
