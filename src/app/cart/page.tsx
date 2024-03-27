'use client'

import CartBody from '@/components/Cart/CartBody'
import Header from '@/components/Header/Header'
import { validateToken } from '@/lib/tokenValidator'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'

const Cart = () => {
	useEffect(() => {
		validateToken()
	}, [])

	return (
		<Provider store={store}>
			<div className='relative min-h-screen'>
				<Header />
				<main className='p-4 md:px-8 md:py-12 lg:px-24 lg:py-16 md:grid-cols-2 md:gap-16'>
					<h1 className='mb-8 text-xl font-bold md:text-2xl lg:text-3xl text-violet-950'>
						Your Cart
					</h1>
					<CartBody />
				</main>
			</div>
		</Provider>
	)
}

export default Cart
