import {Request, Response} from "express"
import prisma from "../db"

// GET ALL
export const getUpdates = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  })
  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  res.json({data: updates})
}

// Get one product

export const getOneUpdate = async (req: Request, res: Response) => {
  const id = req.params.id

  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  })
  res.json({data: update})
}

// Create a new product

export const createUpdate = async (req: Request, res: Response) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  })
  if (!product) {
    return res.json({message: "you don't have a product"})
  }

  const update = await prisma.update.create({
    data: req.body,
  })

  res.json({data: update})
}

// Update a product

export const updateUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  })

  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  const match = updates.find((update: any) => update.id === req.params.id)

  if (!match) {
    res.json({message: "No update found"})
  }

  const updated = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  })

  res.json({data: updated})
}

// delete a product
export const deleteUpdate = async (req: Request, res: Response) => {
  const products = await prisma.product.findMany({
    where: {
      // @ts-ignore
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  })

  const updates = products.reduce((allUpdates: any, product) => {
    return [...allUpdates, ...product.updates]
  }, [])

  const match = updates.find((update: any) => update.id === req.params.id)

  if (!match) {
    res.json({message: "No update found"})
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  })

  res.json({data: deleted})
}
