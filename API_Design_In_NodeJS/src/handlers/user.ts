import {Request, Response} from "express"
import prisma from "../db"
import {comparePasswords, createJWT, hashPasswords} from "../modules/auth"
import {User} from "@prisma/client"

export const createNewUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPasswords(req.body.password),
    },
  })

  const token = createJWT(user)
  res.json({token})
}

export const signIn = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  })

  const isValidUser = await comparePasswords(req.body.password, user?.password)

  if (!isValidUser) {
    res.status(401)
    res.json({message: "Invalid Credential"})
    return
  }

  const token = createJWT(user as User)
  res.json({token})
}
