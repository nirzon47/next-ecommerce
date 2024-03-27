import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { CartSlice } from './cartSlice'

export const store = configureStore({
	reducer: {
		cart: CartSlice.reducer,
	},
})

// Defining the RootState type as the return type of the store.getState function
export type RootState = ReturnType<typeof store.getState>

// Defining the useAppDispatch function as the useDispatch function from the store
export const useAppDispatch: () => typeof store.dispatch = useDispatch

// Defining the useAppSelector function as the useSelector function with the RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
