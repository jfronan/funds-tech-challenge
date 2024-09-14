import React, { useState } from 'react';
import styles from './ProductList.module.css';
import { PRODUCT_LIST_TYPES } from '../../enums/product-list-types';
import AllGroceriesList from './AllGroceriesList/AllGroceriesList';
import AllFavoritesList from './AllFavoritesList/AllFavoritesList';

function ProductList(): React.JSX.Element {
    const [productListType, setProductListType] = useState(PRODUCT_LIST_TYPES.ALL_PRODUCTS);

    const listTypeByProductListType = {
        [PRODUCT_LIST_TYPES.ALL_PRODUCTS]: <AllGroceriesList/>,
        [PRODUCT_LIST_TYPES.FAVORITES]: <AllFavoritesList/>,
    }

    const toggleListType = () => {
        switch (productListType) {
            case PRODUCT_LIST_TYPES.ALL_PRODUCTS:
                setProductListType(PRODUCT_LIST_TYPES.FAVORITES);
                break;
            case PRODUCT_LIST_TYPES.FAVORITES:
                setProductListType(PRODUCT_LIST_TYPES.ALL_PRODUCTS);
                break;
            default:
                setProductListType(PRODUCT_LIST_TYPES.ALL_PRODUCTS);
        }
    }

	return (
		<>
            <header className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    {productListType === PRODUCT_LIST_TYPES.ALL_PRODUCTS ? 'Product List' : 'Favorites! <3'}
                </h1>
                <button className={styles.listToggleButton} onClick={toggleListType}>
                    {productListType === PRODUCT_LIST_TYPES.ALL_PRODUCTS ? 'Check your favorite products!' : 'Go back to product listing'}
                </button>
            </header>
            <div className={styles.pageContent}>
                {listTypeByProductListType[productListType]}
            </div>

        </>
	);
}

export default ProductList;
