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
