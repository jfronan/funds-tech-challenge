import React, { useContext, useState } from 'react';
import styles from './ProductCard.module.css';
import Product from '../../interfaces/Product';
import { ManageCartContext } from '../../contexts/manage-cart-context';
import { foundProductInCartIndex } from '../reducers/manage-cart';
import { DeviceContext } from '../../contexts/device-context';
import { addToCart } from '../../actions/cart-actions';
import { markAsFavorite, unmarkAsFavorite } from '../../adapters/api-adapter';
import { CartProduct } from '../../interfaces/CartProduct';

interface Props {
    product: Product;
}

const ProductCard: React.FunctionComponent<Props> = (props) => {
    const isMobile = useContext(DeviceContext);
    const {cartState, cartDispatch} = useContext(ManageCartContext);
    const [favorite, setFavorite] = useState(!!props.product.favorite);

    const {
        id: prodId,
        image_url: image,
        stock,
        productName: name,
        price,
        productDescription: description,
    } = props.product

    const matchingProductInCartIndex: number = foundProductInCartIndex(cartState.productsInCart, props.product)
    const matchingProductInCart: CartProduct | undefined = cartState.productsInCart[matchingProductInCartIndex]

    const handleToggleFavorite = (): void => {
        if (favorite) {
            unmarkAsFavorite(prodId)
        } else {
            markAsFavorite(prodId)
        }
        setFavorite(!favorite)
    }

    const handleAddToCart = (): void => {
        cartDispatch(addToCart(props.product))
    }

    const currentStock = matchingProductInCart ? stock - matchingProductInCart.amountInCart : stock

	return (
		<div className={styles.cardContainer}>
            <img src={image} alt='' className={styles.productImage}/>
            <div className={styles.topInfoContainer}>
                <div className={styles.leftTopInfoContainer}>
                    <span className={styles.productName}>{name}</span>
                    <span className={styles.productDescription}>{description}</span>
                </div>
                <span className={styles.rightTopInfoContainer}>{price + '€'}</span>
            </div>
            <div className={`${styles.bottomContent} ${isMobile ? styles.centerBottomContent : ''}`}>
                {!isMobile &&
                    <span className={styles.stockLeftText}>
                        {(currentStock) + ' left'}
                    </span>
                }
                <div className={styles.bottomButtonsContainer}>
                    <button
                        className={`${styles.bottomButtom} ${styles.addToCartButton}`}
                        disabled={currentStock < 1}
                        onClick={handleAddToCart}
                    >
                        {currentStock < 1 ? 'No stock' : '+ add'}
                    </button>
                    <button
                        className={`${styles.bottomButtom} ${!!favorite ? styles.unFavButton : styles.addToFavButton}`}
                        onClick={handleToggleFavorite}
                    >
                        {!favorite ? 'Add to favorites' : 'Favorite! <3'}
                    </button>
                </div>
            </div>

        </div>
	);
}

export default ProductCard;
