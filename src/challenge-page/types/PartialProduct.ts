import Product from "../interfaces/Product"

type K = keyof Product

type PartialProduct = {
    [K: string]: Product[K];
};

export default PartialProduct;