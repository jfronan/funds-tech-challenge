import React, { useContext } from 'react';
import styles from './CartView.module.css';
import { DeviceContext } from '../../contexts/device-context';

function CartView(): React.JSX.Element {
    const isMobile: boolean = useContext(DeviceContext)

	return (
		<div className={`${styles.cartContainer} ${isMobile ? styles.reverseOrder : ''}`}>
            <div className={styles.cartListWrapper}>
                {'Some cartCards'}
            </div>
            <button>Checkout</button>

        </div>
	);
}

export default CartView;
