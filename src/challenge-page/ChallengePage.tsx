import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/product-list/ProductList';

const queryClient = new QueryClient();

function ChallengePage(): React.JSX.Element {
	return (
		<QueryClientProvider client={queryClient}>
			<ProductList/>
			{/*<SideMenu/>*/}
		</QueryClientProvider>
	);
}

export default ChallengePage;
