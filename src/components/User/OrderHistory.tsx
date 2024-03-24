import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Orders } from '@/lib/types'
import OrderCard from './OrderCard'

const OrderHistory = ({ token }: { token: string }) => {
	const [orders, setOrders] = useState<Orders>()

	const getOrders = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			setOrders(data)
		} catch (error) {
			toast.error('Something went wrong')
			console.error(error)
		}
	}, [token])

	useEffect(() => {
		getOrders()
	}, [getOrders])

	return (
		<div className='mx-6 md:mx-12 my-6'>
			<h2 className='text-2xl text-violet-950'>Your Orders</h2>
			{orders?.data ? (
				<div className='my-4 space-y-4'>
					{orders.data.orders.map((order) => (
						<OrderCard key={order._id} order={order} />
					))}
				</div>
			) : (
				<h3 className='text-xl my-4'>😞 You have no orders... Yet.</h3>
			)}
		</div>
	)
}

export default OrderHistory
