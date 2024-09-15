import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ProductList from './ProductList';

jest.mock('./AllFavoritesList/AllFavoritesList', () => {
	const ComponentToMock = () => <div />;
	return ComponentToMock;
});
jest.mock('./AllGroceriesList/AllGroceriesList', () => {
	const ComponentToMock = () => <div />;
	return ComponentToMock;
});

describe('renders text variant title', () => {
	it('should say Products by default', () => {
		render(<ProductList />);
		const textElement = screen.getByText(/Products/);
		expect(textElement).toBeInTheDocument();
	});
	it('should say Check your favorite products! by default', () => {
		render(<ProductList />);
		const textElement = screen.getByText(/Check your favorite products!/);
		expect(textElement).toBeInTheDocument();
	});
	it('should say go to Cart', () => {
		jest.spyOn(React, 'useContext').mockReturnValueOnce(true)
		render(<ProductList />)
		const textElement = screen.getByText(/Go to cart/);
		expect(textElement).toBeInTheDocument();
	});
	it('should go to favorites', () => {
		render(<ProductList />)
		const favButton = screen.getByText(/Check your favorite products!/);
		fireEvent.click(favButton);
		const textElement = screen.getByText(/Favorites!/);
		expect(textElement).toBeInTheDocument();
		const anotherTextElement = screen.getByText(/Go back to product listing/);
		expect(anotherTextElement).toBeInTheDocument();
	});
	it('should open and close mobile version cart', () => {
		jest.spyOn(React, 'useContext').mockReturnValue(true)
		render(<ProductList />)
		const cartButton = screen.getByText(/Go to cart/);
		fireEvent.click(cartButton);
		const textElement = screen.getByText(/Cart/);
		expect(textElement).toBeInTheDocument();
		expect(screen.queryByText(/Products/)).not.toBeInTheDocument();
		const backButton = screen.getByText(/<==/);
		fireEvent.click(backButton);
		const productsTextElement = screen.getByText(/Products/);
		expect(productsTextElement).toBeInTheDocument();
	});

});