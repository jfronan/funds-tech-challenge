import React from "react";
import Product from "../../interfaces/Product";
import { CartProduct } from "../../interfaces/CartProduct";
import { REDUCER_ACTIONS } from "../../enums/action-types";

export interface Actions {
	type: REDUCER_ACTIONS,
	product: Product | CartProduct,
}

export interface State {
	productsInCart: CartProduct[]
}

export const manageCartInitialState: State = { 
	productsInCart: []
};

export const foundProductInCartIndex = (productsInCart: CartProduct[], product: Product | CartProduct): number => {
	return productsInCart.findIndex((cartProduct) => cartProduct.id === product.id);
}

export function manageCartReducer(state = manageCartInitialState, action: Actions) {
	const newState = {
		...state
	}
	let productInCartIndex
	switch (action.type) {
		case REDUCER_ACTIONS.ADD_TO_CART:
			productInCartIndex = foundProductInCartIndex(newState.productsInCart, action.product);
			if (productInCartIndex >= 0) {
				if (action.product.stock > newState.productsInCart[productInCartIndex].amountInCart) {
					newState.productsInCart[productInCartIndex].amountInCart = newState.productsInCart[productInCartIndex].amountInCart + 1
				}
			} else {
				if (action.product.stock > 0) {
					const newCartProduct: CartProduct = {
						id: action.product.id,
						image_url: action.product.image_url,
						price: action.product.price,
						productName: action.product.productName,
						stock: action.product.stock,
						amountInCart: 1,
					}
					newState.productsInCart.push(newCartProduct)
				}
			}
			return newState;
		case REDUCER_ACTIONS.REMOVE_FROM_CART:
			productInCartIndex = foundProductInCartIndex(newState.productsInCart, action.product);
			if (productInCartIndex >= 0) {
				if (action.product.stock >= newState.productsInCart[productInCartIndex].amountInCart) {
					newState.productsInCart[productInCartIndex].amountInCart = newState.productsInCart[productInCartIndex].amountInCart - 1
				}
				if (newState.productsInCart[productInCartIndex].amountInCart < 1) {
					newState.productsInCart.splice(productInCartIndex, 1)
				}
			}
			return newState;
		default:
			return state
	}
}
