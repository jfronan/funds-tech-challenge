import Product from "./Product";

export interface CartProduct extends Omit<Product, 'productDescription' | 'favorite'> { amountInCart: number }