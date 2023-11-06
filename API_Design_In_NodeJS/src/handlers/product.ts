import {Request, Response} from "express"
import prisma from "../db"

// GET ALL
export const getProducts = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: req.user.id as string,
    },
    include: {
      products: true,
    },
  })

  res.json({data: user?.products})
}

// Get one product
