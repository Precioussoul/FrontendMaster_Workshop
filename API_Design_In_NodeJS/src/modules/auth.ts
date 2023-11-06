import jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
import bcrypt from "bcrypt"
import {NextFunction, Request, Response} from "express"
import {User} from "@prisma/client"
dotenv.config()

export const comparePasswords = (password: string, hash: any) => {
  return bcrypt.compare(password, hash)
}

export const hashPasswords = (password: string) => {
  return bcrypt.hash(password, 5)
}

export const createJWT = (user: User) => {
  const token = jwt.sign(
    {id: user.id, username: user.username},
    process.env.JWT_SECRET as string
  )

  return token
}
// middleware
export const protect = (req: Request, res: Response, next: NextFunction) => {
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

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string)
    // @ts-ignore attached user const to request global to verify anywhere else in our codebase
    req.user = user
    next()
  } catch (error) {
    console.log("error:", error)
    res.status(401)
    res.json({message: "not valid token"})
    return
  }
}
