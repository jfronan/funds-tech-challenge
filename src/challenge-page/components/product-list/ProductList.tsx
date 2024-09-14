import React, { useContext, useMemo, useState } from 'react';
import styles from './ProductList.module.css';
import { PRODUCT_LIST_TYPES } from '../../enums/product-list-types';
import AllGroceriesList from './AllGroceriesList/AllGroceriesList';
import AllFavoritesList from './AllFavoritesList/AllFavoritesList';
import { DeviceContext } from '../../contexts/device-context';
import CartView from '../cart-view/CartView';


function ProductList(): React.JSX.Element {
    const isMobile: boolean = useContext(DeviceContext);
    const [productListType, setProductListType] = useState(PRODUCT_LIST_TYPES.ALL_PRODUCTS);
    const [showMobileCart, setShowMobileCart] = useState(false)

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

    const toggleShowCart = () => {
        setShowMobileCart(!showMobileCart)
    }

    const cartView = useMemo(() => {
        return <CartView/>
    }, []);

    const mobileCartMode = isMobile && showMobileCart

	return (
		<>
            <header className={`${styles.pageHeader} ${!mobileCartMode ? styles.headerFlexSpace : ''}`}>
                {(mobileCartMode)
                    ? <>
                        <button className={styles.mobileCartBackBUtton} onClick={toggleShowCart}>{'<=='}</button>
                        <h1 className={styles.pageTitle}>
                            Cart
                        </h1>
                    </>
                    : <>
                        <h1 className={styles.pageTitle}>
                            {productListType === PRODUCT_LIST_TYPES.ALL_PRODUCTS ? 'Products' : 'Favorites!'}
                        </h1>
                        <div className={styles.buttonsContainer}>
                            <button className={styles.listToggleViewButton} onClick={toggleListType}>
                                {productListType === PRODUCT_LIST_TYPES.ALL_PRODUCTS ? 'Check your favorite products!' : 'Go back to product listing'}
                            </button>
                            {isMobile && <button className={styles.listToggleViewButton} onClick={toggleShowCart}>
                                {'Go to cart'}
                            </button>}
                        </div>
                    </>
                }
            </header>
            <div className={styles.pageContent}>
                {mobileCartMode && cartView}
                <div className={`${!isMobile ? styles.sidebarMargin : ''} ${(mobileCartMode) ? styles.hidden : ''}`}>
                    {!isMobile && <div className={styles.sideBarWrapper}>
                        {cartView}
                    </div>}
                    {listTypeByProductListType[productListType]}
                </div>
            </div>

        </>
	);
}

export default ProductList;
