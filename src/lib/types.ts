// Interface for decoded token
export interface DecodedToken {
	_id: string
	email: string
	role: string
	exp: number
	iat: number
}
