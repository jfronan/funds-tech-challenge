import React from 'react';
import { getFavorites } from '../../../adapters/api-adapter';
import ProductInfiniteScroll from '../../product-infinite-scroll/ProductInfiniteScroll';

function AllFavoritesList(): React.JSX.Element {
	return <ProductInfiniteScroll getProductsFunction={getFavorites}/>
}

export default AllFavoritesList;
