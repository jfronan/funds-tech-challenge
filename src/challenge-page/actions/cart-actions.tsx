import { Actions } from "../components/reducers/manage-cart";
import { REDUCER_ACTIONS } from "../enums/action-types";
import { CartProduct } from "../interfaces/CartProduct";
import Product from "../interfaces/Product";

export const addToCart = (product: Product | CartProduct): Actions => {
    return {
        type: REDUCER_ACTIONS.ADD_TO_CART,
        product,
    }
}

export const removeFromCart = (product: CartProduct): Actions => {
    return {
        type: REDUCER_ACTIONS.REMOVE_FROM_CART,
        product,
    }
}
