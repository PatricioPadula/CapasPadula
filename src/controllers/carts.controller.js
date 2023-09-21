import { productsDao, cartsDao } from "../dao/managers/index.js";

export class CartsController {
  static getCarts = async (req, res) => {
    try {
      const cart = await cartsDao.getAll();
      res.json({ status: "success", data: cart });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static createCart = async (req, res) => {
    try {
      const cartCreated = await cartsDao.save();
      res.json({
        status: "success",
        data: cartCreated,
        message: "carrito creado",
      });
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static getCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const cart = await cartsDao.getById(cartId);
      if (cart) {
        res.json({
          status: "success",
          data: cart,
          message: "carrito encontrado",
        });
      } else {
        res.json({
          status: "error",
          message: `El carrito con id:${cid} no existe`,
        });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };

  static updateCart = async (req, res) => {
    try {
      const cartId = req.params.cid;
      const productId = req.params.pid;

      const cart = await cartsDao.getById(cartId);
      if (cart) {
        const product = await productsDao.getById(productId);
        let cartProducts = cart.products;

        let prod = cartProducts.find((e) => {
          return parseInt(e.product) === productId;
        });

        if (prod != undefined) {
          prod.quantity++;
        } else {
          const newProd = {
            product: productId,
            quantity: 1,
          };
          cart.products.push(newProd);
        }

        cartsDao.update(cartId, cart);
        res.json({ status: "success", data: cart });
      } else {
        res.json({ status: "error", message: `El carrito ${cid} no existe.` });
      }
    } catch (error) {
      res.json({ status: "error", message: error.message });
    }
  };
}
