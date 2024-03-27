import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	total: 0,
}

export const CartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartTotal: (state, action) => {
			state.total = action.payload
		},
	},
})

export default CartSlice.reducer
export const { setCartTotal } = CartSlice.actions
