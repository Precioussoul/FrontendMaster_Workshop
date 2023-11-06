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

export const getOneProduct = async (req: Request, res: Response) => {
  const id = req.params.id

  const product = await prisma.product.findFirst({
    where: {
      id,
      // @ts-ignore
      belongsToId: req.user.id,
    },
  })
  res.json({data: product})
}

// Create a new product

export const createProduct = async (req: Request, res: Response) => {
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      // @ts-ignore
      belongsToId: req.user.id,
    },
  })

  res.json({data: product})
}

// Update a product

export const updateProduct = async (req: Request, res: Response) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  })

  res.json({data: updated})
}

// delete a product
export const deleteProduct = async (req: Request, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      // @ts-ignore
      belongsToId: req.user.id,
    },
  })

  res.json({data: deleted})
}
