import { CartReq } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	total: 0,
	cart: {} as CartReq,
}

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart: (state, action) => {
			state.cart = action.payload
		},
		setCartTotal: (state, action) => {
			state.total = action.payload
		},
	},
})

export default CartSlice.reducer
export const { setCart, setCartTotal } = CartSlice.actions
