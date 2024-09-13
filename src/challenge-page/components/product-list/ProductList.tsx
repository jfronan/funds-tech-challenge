import React from 'react';
import { useQuery } from 'react-query';
import styles from './ProductList.module.css';
import { getAllGroceries } from '../../adapters/api-adapter';

function ProductList(): React.JSX.Element {
    const { data: groceries, isLoading } = useQuery({
        queryFn: getAllGroceries,
        queryKey: ['groceries']
    })

    if (isLoading) {
        return <div className={styles.loadingMessage}>Loading Products...</div>
    }

	return (
		<>
            {groceries?.map((product) => {
                return <div key={product.id} className={styles.genericBorder}>
                    <span>{product.productName}</span>
                    <span>{product.stock}</span>
                </div>
            })}
        </>
	);
}

export default ProductList;
