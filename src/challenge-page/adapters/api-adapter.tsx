import axios from "axios";
import Product from "../interfaces/Product";
import PartialProduct from "../types/PartialProduct";
import objectToUrlParams from "../../helpers/object-to-url-params";
import { CheckoutDTO } from "../interfaces/CheckOutDTO";
import axiosRetry from 'axios-retry';

const BASE_URL = 'http://localhost:3000'; // In a real scenario, here we would have a handler for env configs
export const PRODUCTS_PER_PAGE = 20;

axiosRetry(axios, {
	retries: 3,
});

const getGroceries = async (page: number, queryParams?: PartialProduct): Promise<Product[]> => {
	let queryString = '';
	if (queryParams) {
		const queryStringBuilder = objectToUrlParams(queryParams);
		if (!!queryStringBuilder) {
			queryString = `&${queryStringBuilder}`
		}
	}
	const response = await axios.get(`${BASE_URL}/grocery?_limit=${PRODUCTS_PER_PAGE}&_page=${page}${queryString}`)
	return response.data
}

const patchGrocery = async (productId: string, patchData: PartialProduct): Promise<Product[]> => {
	const response = await axios.patch(`${BASE_URL}/grocery/${productId}`, patchData)
	return response.data
}

const modifyStock = (productId: string, quantity: number) => patchGrocery(productId, { stock: quantity } as PartialProduct);

export const checkout = async (checkoutList: CheckoutDTO[]) => {
	await Promise.all(checkoutList.map((listElement)=>modifyStock(listElement.id, listElement.remainingStock)));

	window.location.reload(); // This "emulates" the user going through checkout page, payment data, completing purchase, etc
}

export const getAllGroceries = (page: number) => getGroceries(page);
export const getFavorites = (page: number) => getGroceries(page, { favorite: 1 } as PartialProduct);
export const markAsFavorite = (productId: string) => patchGrocery(productId, { favorite: 1 } as PartialProduct);
export const unmarkAsFavorite = (productId: string) => patchGrocery(productId, { favorite: 0 } as PartialProduct);
