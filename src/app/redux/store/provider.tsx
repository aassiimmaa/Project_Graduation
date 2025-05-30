'use client'
import React from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './index'
import { PersistGate } from 'redux-persist/integration/react'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {' '}
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
