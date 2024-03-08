"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../lib/store'
import Header from '@/Components/Header/Header'


export default function storeProvider({ children }) {
    return (
        <Provider store={store}>
            <Header />
            {children}
        </Provider>
    )
}
