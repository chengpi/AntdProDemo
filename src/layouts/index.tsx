import { Outlet } from '@umijs/max';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from '@/state';
import ConnectProvider from '@/components/Provider/ConnectProvider';
const queryClient = new QueryClient();

const layout = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {/* @ts-ignore */}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <ConnectProvider>
          <Outlet />
        </ConnectProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
);
export default layout;
