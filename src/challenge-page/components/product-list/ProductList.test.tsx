import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductList from './ProductList';

jest.mock('./AllFavoritesList/AllFavoritesList', () => {
	const ComponentToMock = () => <div />;
	return ComponentToMock;
});
jest.mock('./AllGroceriesList/AllGroceriesList', () => {
	const ComponentToMock = () => <div />;
	return ComponentToMock;
});

test('renders Cart title', () => {
	render(<ProductList />);
	const linkElement = screen.getByText(/Products/);
	expect(linkElement).toBeInTheDocument();
});