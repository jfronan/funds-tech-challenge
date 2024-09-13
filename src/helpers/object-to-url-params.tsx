import PartialProduct from "../challenge-page/types/PartialProduct";

export default function objectToUrlParams(obj: PartialProduct): string {
	const params = [];

	for (const key in obj) {
		params.push(`${key}=${obj[key]}`);
	}

	return params.join('&');
}