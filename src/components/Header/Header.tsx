'use client'

import { ShoppingCartIcon, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import Logo from './Logo'
import SearchBar from './SearchBar'
import UserButton from './UserButton'
import SearchBarMobile from './SearchBarMobile'
import { DecodedToken } from '@/lib/types'

const Header = () => {
	const [token, setToken] = useState<string>('')
	const [showSearchBar, setShowSearchBar] = useState<boolean>(false)
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
		<header className='sticky top-0 z-50 grid gap-2 py-1 bg-violet-950'>
			<div className='flex items-center justify-between px-2 md:justify-center md:gap-24'>
				<Logo />
				<SearchBar />
				<div className='flex items-center gap-4 md:gap-4'>
					<Search
						className='duration-200 cursor-pointer md:hidden text-violet-50 hover:text-violet-300'
						onClick={() => setShowSearchBar(!showSearchBar)}
					/>
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
			</div>
			<SearchBarMobile showSearchBar={showSearchBar} />
		</header>
	)
}

export default Header
