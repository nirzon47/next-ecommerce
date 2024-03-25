import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from './types'

export const validateToken = () => {
	let token: string = ''

	// Get token from local storage
	if (typeof window !== 'undefined') {
		token = localStorage.getItem('token') || ''
	}

	// If no token, redirect to login
	if (!token) {
		window.location.href = '/login'
		return
	}

	// Decode the token
	const decodedToken = jwtDecode<DecodedToken>(token)

	// Check if token is expired
	const isExpired = decodedToken.exp && decodedToken.exp < Date.now() / 1000

	// If token is expired, remove it from local storage and reload the page
	if (isExpired) {
		localStorage.removeItem('token')
		window.location.href = '/login'
		return
	}

	return decodedToken
}
