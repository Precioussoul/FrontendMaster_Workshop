import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import {Request, Response} from "express"
dotenv.config()

export const createJWT = (user: {id: string; username: string}) => {
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET as string
  )

  return token
}

export const protect = (req: Request, res: Response) => {
  const bearer = req.headers.authorization

  if (!bearer) {
    res.status(401)
    res.json({message: "not authorized"})
    return
  }

  const [_, token] = bearer.split(" ")

  if (!token) {
    res.status(401)
    res.json({message: "not valid token"})
    return
  }
}
