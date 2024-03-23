'use client'

import { ShoppingCartIcon } from 'lucide-react'
import { Button } from '../button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserButton from './UserButton'

// Interface for decoded token
interface DecodedToken {
	_id: string
	email: string
	role: string
	exp: number
	iat: number
}

const Header = () => {
	const [token, setToken] = useState<string>('')
	const router = useRouter()

	useEffect(() => {
		// Get token from local storage
		const savedToken = getTokenFromStorage()
		setToken(savedToken)

		// Validate token
		validateToken(savedToken)
	}, [])

	// Get token from local storage
	const getTokenFromStorage = () => {
		// If running on the server, return an empty string
		if (typeof window !== 'undefined') {
			return localStorage.getItem('token') || ''
		}

		return ''
	}

	// Validate token
	const validateToken = (token: string) => {
		// If no token, return
		if (!token) return

		// Decode token
		const decodedToken = jwtDecode<DecodedToken>(token)
		const isExpired = decodedToken.exp && decodedToken.exp < Date.now() / 1000

		// If token is expired, remove it from local storage and reload the page
		if (isExpired) {
			localStorage.removeItem('token')
			window.location.reload()
		}
	}

	return (
		<header className='sticky top-0 z-50 flex items-center justify-center gap-24 py-1 bg-violet-950'>
			<Logo />
			<SearchBar />
			<div className='flex items-center gap-4'>
				{token ? (
					<UserButton token={token} />
				) : (
					<Button
						variant='success'
						size={'sm'}
						onClick={() => router.push('/login')}
					>
						Login
					</Button>
				)}
				<ShoppingCartIcon className='duration-200 cursor-pointer text-violet-50 hover:text-violet-300' />
			</div>
		</header>
	)
}

export default Header
