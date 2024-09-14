import React from 'react';
import { getFavorites } from '../../../adapters/api-adapter';
import ProductInfiniteScroll from '../../ProductInfiniteScroll/ProductInfiniteScroll';

function AllFavoritesList(): React.JSX.Element {
	return <ProductInfiniteScroll getProductsFunction={getFavorites}/>
}

export default AllFavoritesList;
