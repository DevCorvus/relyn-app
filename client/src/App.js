import React from 'react';
import useAppInitializer from './hooks/useAppInitializer';
import Client from './Client';
import AppLoading from './components/loadings/AppLoading';

export default function App() {
  const serverStatus = useAppInitializer();

  if (serverStatus === 'loading') return <AppLoading />;
  if (serverStatus === 'off') return <AppLoading error={true} />;

  return <Client />;
}
