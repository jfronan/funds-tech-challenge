import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './components/product-list/ProductList';
import { useIsMobile } from './hooks/use-is-mobile';
import { DeviceContext } from './contexts/device-context';

const queryClient = new QueryClient();

function ChallengePage(): React.JSX.Element {

	return (
		<QueryClientProvider client={queryClient}>
			<DeviceContext.Provider value={useIsMobile()}>
				<ProductList/>
			</DeviceContext.Provider>
		</QueryClientProvider>
	);
}

export default ChallengePage;
