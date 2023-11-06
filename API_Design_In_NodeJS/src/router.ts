import {Request, Response, Router} from "express"
import {body, oneOf, validationResult} from "express-validator"
import {handleInputError} from "./modules/middleware"

const router = Router()

/**
 Products
 **/

router.get("/product", (req, res) => {
  res.json({msg: "hello product"})
})
router.get("/product/:id", () => {})
router.put("/product/:id", () => {})
router.post(
  "/product",
  body("name").isString(),
  handleInputError,
  (req: Request, res: Response) => {}
)
router.delete("/product/:id", () => {})

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

router.post("/updatepoint", () => {})
router.delete("/updatepoint/:id", () => {})

export default router
