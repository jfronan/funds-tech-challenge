import React from 'react';
import styles from './ProductCard.module.css';
import Product from '../../interfaces/Product';

interface Props {
    product: Product;
}

const ProductCard: React.FunctionComponent<Props> = (props) => {
    const {
        id: prodId,
        image_url: image,
        stock,
        productName: name,
        price,
        productDescription: description,
        favorite
    } = props.product

	return (
		<div className={styles.cardContainer}>
            <img src={image} alt='' className={styles.productImage}/>
            <span>{name}</span>
            <span>{description}</span>
            <span>{price}</span>
            <span>{stock + ' left'}</span>
            <button>{!favorite ? 'Add to favorites' : 'Favorite! <3'}</button>
            <button>{'+ add'}</button>

        </div>
	);
}

export default ProductCard;
