import React from 'react';
import AppProvider from './Context';
import Router from './router';

export default function App(): React.JSX.Element {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  );
}
