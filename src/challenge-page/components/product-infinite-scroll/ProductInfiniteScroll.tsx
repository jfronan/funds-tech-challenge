import React, { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import styles from './ProductInfiniteScroll.module.css';
import { PRODUCTS_PER_PAGE } from '../../adapters/api-adapter';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from '../product-card/ProductCard';
import Product from '../../interfaces/Product';

interface Props {
	getProductsFunction: (page: number) => Promise<Product[]>,
}

const ProductInfiniteScroll: React.FunctionComponent<Props> = (props) => {
	const { getProductsFunction } = props
	const {
		data: groceriesPages,
		fetchNextPage,
		hasNextPage,
		remove,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ['groceries'],
		queryFn: ({pageParam = 1}) => getProductsFunction(pageParam),
		getNextPageParam: (lastPage, pages) => {
			return lastPage?.length !== 0 ? pages.length + 1 : undefined
		},
	})

	useEffect(()=>{
		return () => { remove() }
	}, [remove])

	const groceries = useMemo(() => groceriesPages?.pages.reduce((prev, page) => {
		return [...prev, ...page]
	}), [groceriesPages])

	if (status === 'loading') {
		return <p className={styles.loadingMessage}>Loading Products...</p>
	}
	if (status === 'error') {
		return <p>Error loading products. Please try again later</p>
	}
	return <InfiniteScroll
		dataLength={groceries ? groceries.length : 0}
		next={() => {if (!isFetchingNextPage) {fetchNextPage()}}}
		hasMore={!!hasNextPage}
		loader={!!hasNextPage && groceries && groceries.length >= PRODUCTS_PER_PAGE && <p>Fetching more products...</p>}
	>
		<div className={styles.cardsContainer}>
			{groceries?.map((product) => (
				<ProductCard product={product} key={product.id}/>
			))}
		</div>
	</InfiniteScroll>
}




export default ProductInfiniteScroll;
