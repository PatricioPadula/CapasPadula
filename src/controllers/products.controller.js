import { ProductsService } from "../services/products.service.js";

export class ProductsController{
    static getProducts = async(req,res)=>{
        try {
            const limit = req.query.limit;
            const products = await ProductsService.getProducts();
            if(limit){
                //devolver los productos de acuerdo al limite
                const filtro = products.slice(0, limit);
                res.json({status:"success", data:filtro}); 
            }else{
                res.json({status:"success", data:products});            
            }
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };
    
    static getProduct = async(req,res)=>{
        try {
            const pid = req.params.pid;
            const productosId = await ProductsService.getProduct(pid);
            res.json({status:"success", data:productosId});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
        
    };

    static createProduct = async(req,res)=>{
        try {
            const newProduct = req.body;
            const productCreated = await ProductsService.createProduct(newProduct);
            res.json({status:"success", data:productCreated, message:"producto creado"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    };

    static updateProduct = (req,res) =>{
        const newProduct = req.body;    
    };

    static deleteProduct = async(req,res)=>{
        try {
            const pid = req.params.pid;
            const productosId = await ProductsService.deleteProduct(pid);
            console.log(productosId);
            res.json({status:"success", message:"el producto se eliminó con éxito"});
        } catch (error) {
            res.json({status:"error", message:error.message});
        }
    }
}