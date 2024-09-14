import React from 'react';
import { getAllGroceries } from '../../../adapters/api-adapter';
import ProductInfiniteScroll from '../../ProductInfiniteScroll/ProductInfiniteScroll';

function AllGroceriesList(): React.JSX.Element {
	return <ProductInfiniteScroll getProductsFunction={getAllGroceries}/>
}

export default AllGroceriesList;
