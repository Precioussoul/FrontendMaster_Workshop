import {Router} from "express"
import {body} from "express-validator"
import {handleInputError} from "./modules/middleware"
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from "./handlers/product"
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from "./handlers/update"
import {errorHandler} from "./handlers/error"

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

router.get("/update", getUpdates)
router.get("/update/:id", getOneUpdate)
router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  updateUpdate
)
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  createUpdate
)
router.delete("/update/:id", deleteUpdate)
// ERROR HANDLER in sub routes
router.use(errorHandler)

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
