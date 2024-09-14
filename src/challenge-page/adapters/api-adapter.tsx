import axios from "axios";
import Product from "../interfaces/Product";
import PartialProduct from "../types/PartialProduct";
import objectToUrlParams from "../../helpers/object-to-url-params";

const BASE_URL = 'http://localhost:3000'; // In a real scenario, here we would have a handler for env configs
export const PRODUCTS_PER_PAGE = 20;

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
	const response = await axios.post(`${BASE_URL}/grocery/${productId}`, patchData)
	return response.data
}

export const getAllGroceries = (page: number) => getGroceries(page);
export const getFavorites = (page: number) => getGroceries(page, { favorite: 1 } as PartialProduct);
export const markAsFavorite = (productId: string) => patchGrocery(productId, { favorite: 1 } as PartialProduct);
export const unmarkAsFavorite = (productId: string) => patchGrocery(productId, { favorite: 0 } as PartialProduct);
export const modifyStock = (productId: string, quantity: number) => patchGrocery(productId, { stock: 1 } as PartialProduct);
