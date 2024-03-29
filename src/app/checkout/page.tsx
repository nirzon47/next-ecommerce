'use client'

import Header from '@/components/Header/Header'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import AddressForm from '@/components/Profile/AddressForm'
import { validateToken } from '@/lib/tokenValidator'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import Script from 'next/script'
import { useRouter } from 'next/navigation'

const Checkout = () => {
	const [modeOfPayment, setModeOfPayment] = useState<string>('cod')
	const router = useRouter()

	const initiatePayment = async () => {
		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/checkout`,
				{
					paymentMode: modeOfPayment,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (modeOfPayment === 'cod') {
				return
			}

			const options = {
				key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
				amount: data.order.total * 100,
				currency: 'INR', // You can set this value to your desired currency from the constants
				name: 'ShipShop',
				description: 'Very serious, mega important payment',
				image: '/logo.png',
				order_id: data.order.RPOrder.id, // This is the order ID obtained from the server
				handler: async (response: any) => {
					// Handle the successful payment response
					const responseData = await axios.post(
						`${process.env.NEXT_PUBLIC_SERVER_URL}/checkout/confirm`,
						{
							orderID: data.order.cart._id,
						}
					)

					router.push('/success')
				},
				prefill: {
					name: 'ShipShop',
				},
				notes: {
					address: 'Idk',
				},
				theme: {
					color: '#5b21b6',
				},
			}

			// @ts-ignore
			const instance = new window.Razorpay(options)

			instance.on('payment.failed', function (response: any) {
				console.log(response.error.code)
				console.log(response.error.description)
				console.log(response.error.source)
				console.log(response.error.step)
				console.log(response.error.reason)
				console.log(response.error.metadata.order_id)
				console.log(response.error.metadata.payment_id)
			})

			instance.open()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		validateToken()
	})

	return (
		<>
			<Script
				id='razorpay-checkout-js'
				src='https://checkout.razorpay.com/v1/checkout.js'
			/>
			<Provider store={store}>
				<div className='relative min-h-screen'>
					<Header />
					<main className='p-4 md:px-8 md:py-12 lg:px-24 lg:py-16 md:grid-cols-2 md:gap-16'>
						<h1 className='mb-8 text-xl font-bold md:text-2xl lg:text-3xl text-violet-950'>
							Checkout
						</h1>
						<section>
							<div className='flex gap-24 mt-8'>
								<div className='space-y-6'>
									<p className='text-lg font-semibold text-violet-900'>
										Your order will be shipped to
									</p>
									<AddressForm disabled={true} showButton={false} />
								</div>
								<div className='space-y-6 '>
									<h2 className='text-lg font-semibold text-violet-900'>
										Mode of Payment
									</h2>
									<div className='space-y-12'>
										<RadioGroup
											defaultValue='cod'
											value={modeOfPayment}
											className='space-y-2'
											onValueChange={(e) => setModeOfPayment(e)}
										>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='cod'
													id='cash-on-delivery'
												/>
												<Label htmlFor='cash-on-delivery'>
													Cash on Delivery
												</Label>
											</div>
											<div className='flex items-center space-x-2'>
												<RadioGroupItem
													value='online'
													id='online'
												/>
												<Label htmlFor='online'>RazorPay</Label>
											</div>
										</RadioGroup>
										<Button onClick={initiatePayment}>
											Checkout
										</Button>
									</div>
								</div>
							</div>
						</section>
					</main>
				</div>
			</Provider>
		</>
	)
}

export default Checkout
