'use client'

import Header from '@/components/Header/Header'
import OrderHistory from '@/components/Orders/OrderHistory'
import { useEffect, useState } from 'react'

const Orders = () => {
	const [token, setToken] = useState<string>('')

	useEffect(() => {
		// Get token from local storage
		const savedToken = localStorage.getItem('token') || ''
		setToken(savedToken)
	}, [token])

	return (
		<div className='relative min-h-screen'>
			<Header />
			<main>
				<h1 className='text-xl md:text-2xl lg:text-3xl m-6 md:m-12 font-bold text-violet-950'>
					Your orders
				</h1>
				{token && <OrderHistory token={token || ''} />}
			</main>
		</div>
	)
}

export default Orders
