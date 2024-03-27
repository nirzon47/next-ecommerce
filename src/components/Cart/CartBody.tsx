'use client'

import axios from 'axios'
import { useCallback, useEffect } from 'react'
import CartItem from './CartItem'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { setCart, setCartTotal } from '@/app/store/cartSlice'

const CartBody = () => {
	const cart = useAppSelector((state) => state.cart.cart)
	const total = useAppSelector((state) => state.cart.total)
	const dispatch = useAppDispatch()

	const getCart = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/cart`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			dispatch(setCart(data))
			dispatch(setCartTotal(data?.total))
		} catch (error) {
			console.log(error)
		}
	}, [dispatch])

	useEffect(() => {
		getCart()
	}, [getCart])

	return (
		<div className='space-y-4'>
			{!cart?.success && <p>No items in cart</p>}
			{cart?.success &&
				cart?.cart.products.map((item: any) => (
					<CartItem key={item._id} item={item} />
				))}
			{/* TODO: Add context management */}
			{cart?.success && (
				<p className='flex items-end justify-end pt-12 text-lg font-bold text-violet-900'>
					Total: ₹{total}
				</p>
			)}
		</div>
	)
}

export default CartBody
