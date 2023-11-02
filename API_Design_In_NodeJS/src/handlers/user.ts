import {Request, Response} from "express"
import prisma from "../db"
import {createJWT, hashPasswords} from "../modules/auth"

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
