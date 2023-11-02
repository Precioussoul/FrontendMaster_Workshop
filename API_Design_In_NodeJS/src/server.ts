import express, {NextFunction} from "express"
import router from "./router"
import morgan from "morgan"
import {protect} from "./modules/auth"
import {createNewUser, signIn} from "./handlers/user"

const app = express()

const customLogger =
  (message: string) => (req: Request, res: Response, next: NextFunction) => {
    console.log(`hello from ${message}`)
    next()
  }

app.use(morgan("dev"))
// allow user to send us json data
app.use(express.json())
// allow user to use querystring to send us data
app.use(express.urlencoded({extended: true}))

// @ts-ignore
app.use(customLogger("custom logger"))

app.get("/", (req, res) => {
  res.json({msg: "hello world"})
})

app.use("/api", protect, router)
app.post("/user", createNewUser)
app.post("/signin", signIn)

export default app
