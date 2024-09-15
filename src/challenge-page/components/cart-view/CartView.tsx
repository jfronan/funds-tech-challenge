import React, { useContext } from 'react';
import styles from './CartView.module.css';
import { DeviceContext } from '../../contexts/device-context';
import { ManageCartContext } from '../../contexts/manage-cart-context';
import { CartProduct } from '../../interfaces/CartProduct';
import { addToCart, removeFromCart } from '../../actions/cart-actions';
import { CheckoutDTO } from '../../interfaces/CheckOutDTO';
import { checkout } from '../../adapters/api-adapter';

function CartView(): React.JSX.Element {
	const isMobile: boolean = useContext(DeviceContext)
	const {cartState, cartDispatch} = useContext(ManageCartContext);
	
    const handleAddToCart = (cartProduct: CartProduct): void => {
        cartDispatch(addToCart(cartProduct))
    }
	
    const handleRemoveFromCart = (cartProduct: CartProduct): void => {
        cartDispatch(removeFromCart(cartProduct))
    }

	let checkoutAmount = 0;
	let checkoutList: CheckoutDTO[] = []
	return (
		<div className={`${styles.cartContainer} ${isMobile ? styles.reverseOrder : ''}`}>
			<div className={styles.cartListWrapper}>
				{cartState.productsInCart.map((cartProduct: CartProduct) => {
					const remainingStock = cartProduct.stock - cartProduct.amountInCart
					checkoutAmount += (cartProduct.price * cartProduct.amountInCart)
					checkoutList.push({id: cartProduct.id, remainingStock})
					return <div key={cartProduct.id} className={styles.cartProductContainer}>
						<img src={cartProduct.image_url} alt={''} className={styles.productThumbnail}/>
						<div className={styles.dataBox}>
							<div className={styles.productName}>
								{cartProduct.productName}
							</div>
							<div className={styles.stockManagementContainer}>
								<button
									className={styles.stockManagementButton}
									onClick={()=>handleRemoveFromCart(cartProduct)}
								>
									{'-'}
								</button>
								<div className={styles.stockText}>{cartProduct.amountInCart}</div>
								<button
									className={`${styles.stockManagementButton} ${remainingStock < 1 ? styles.hidden : ''}`}
									onClick={()=>handleAddToCart(cartProduct)}
								>
									{'+'}
								</button>
							</div>
						</div>
						<div className={styles.priceBox}>
							{cartProduct.price + '€'}
						</div>
					</div>
				})}
			</div>
			<button
				className={styles.checkoutButton}
				onClick={()=>checkout(checkoutList)}
				disabled={checkoutAmount === 0}
			>
				{'Checkout ' + checkoutAmount + '€'}
			</button>
		</div>
	);
}

export default CartView;
