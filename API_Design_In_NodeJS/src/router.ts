import {Request, Response, Router} from "express"
import {body, oneOf, validationResult} from "express-validator"
import {handleInputError} from "./modules/middleware"
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product"

const router = Router()

/**
 Products
 **/

router.get("/product", getProducts)
router.get("/product/:id", getOneProduct)
router.put("/product/:id", updateProduct)
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  createProduct
)
router.delete("/product/:id", deleteProduct)

/**
 Update
 **/

router.get("/update", () => {})
router.get("/update/:id", () => {})
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  () => {}
)
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  () => {}
)
router.delete("/update/:id", () => {})

/**
 Update points
 **/

router.get("/updatepoint", () => {})
router.get("/updatepoint/:id", () => {})

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  () => {}
)

router.post(
  "/updatepoint",
  body("name").optional().isString(),
  body("description").optional().isString(),
  body("updateId").exists().isString(),
  () => {}
)
router.delete("/updatepoint/:id", () => {})

export default router
