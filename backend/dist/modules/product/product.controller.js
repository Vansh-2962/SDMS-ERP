import { ProductMapper } from "./mappers/product.mapper.js";
export class ProductController {
    productService;
    constructor(productService) {
        this.productService = productService;
    }
    create = async (req, res) => {
        const { body } = req.validated;
        const userId = req.authorization?.userId;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User not found",
                data: null,
            });
        }
        const product = await this.productService.create(body, userId);
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: ProductMapper.toRespoonse(product),
        });
    };
    getAll = async (req, res) => {
        const userId = req.auth.userId;
        const products = await this.productService.getAll(userId);
        return res.status(201).json({
            success: true,
            message: "Products fetched successfully",
            data: ProductMapper.allProductsResponse(products),
        });
    };
    getById = async (req, res) => {
        const id = req.params.id;
        const product = await this.productService.getById(id, req.auth.userId);
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: ProductMapper.detailsResponse(product),
        });
    };
    update = async (req, res) => {
        const { params, body } = req.validated;
        const product = await this.productService.update(params.id, body, req.auth.userId);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: ProductMapper.detailsResponse(product),
        });
    };
    deleteProduct = async (req, res) => {
        const { params } = req.validated;
        const deleted = await this.productService.deleteProduct(params.id);
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: ProductMapper.deleteResponse(deleted),
        });
    };
}
//# sourceMappingURL=product.controller.js.map