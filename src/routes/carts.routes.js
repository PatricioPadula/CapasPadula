import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";


const router = Router();

router.get("/", CartsController.getCarts)
router.post("/", CartsController.createCart)
router.get("/:cid", CartsController.getCart)
router.post("/:cid/product/:pid", CartsController.updateCart);

export {router as cartsRouter}