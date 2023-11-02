import {Router} from "express"

const router = Router()

/**
 Products
 **/

router.get("/product", (req, res) => {
  res.json({msg: "hello product"})
})
router.get("/product/:id", () => {})
router.put("/product/:id", () => {})
router.post("/product", () => {})
router.delete("/product/:id", () => {})

/**
 Update
 **/

router.get("/update", () => {})
router.get("/update/:id", () => {})
router.put("/update/:id", () => {})
router.post("/update", () => {})
router.delete("/update/:id", () => {})

/**
 Update points
 **/

router.get("/updatepoint", () => {})
router.get("/updatepoint/:id", () => {})
router.put("/updatepoint/:id", () => {})
router.post("/updatepoint", () => {})
router.delete("/updatepoint/:id", () => {})

export default router