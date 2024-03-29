import Razorpay from 'razorpay'

// Interface for decoded token
export interface DecodedToken {
	_id: string
	email: string
	role: string
	exp: number
	iat: number
}

export interface Orders {
	success: boolean
	data: {
		_id: string
		user: {
			address: {
				street: string
				city: string
				district: string
				state: string
				zip: number
				country: string
			}
		}
		orders: [
			{
				cart: {
					products: [
						{
							item: {
								_id: string
								name: string
								price: number
								imagePath: string
							}
							quantity: number
							variant: string
							_id: string
						}
					]
				}
				total: number
				date: number
				_id: string
				paymentMode: 'COD' | 'ONLINE'
				transactionID: string
			}
		]
	}
}

export interface CartReq {
	success: boolean
	message: string
	cart: any
	total: number
}

export interface RazorpayInterface extends Razorpay {
	on(event: 'payment.failed', handler: (response: any) => void): void
	open(): void
}

export interface IRazorpayConfig {
	key_id: string
	amount: number
	currency?: string
	name: string
	description?: string
	image?: string
	order_id: string
	handler: (response: any) => void
	prefill?: {
		name?: string
		email?: string
		contact?: string
	}
	notes?: {
		[key: string]: string
	}
	theme?: {
		color?: string
	}
}
