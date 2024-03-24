'use client'

import Header from '@/components/Header/Header'
import { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { DecodedToken } from '@/lib/types'

const Profile = () => {
	const [user, setUser] = useState<any>({})

	// Validate token
	useEffect(() => {
		let token: string = ''
		// Get token from local storage
		if (typeof window !== 'undefined') {
			token = localStorage.getItem('token') || ''
		}

		// If no token, redirect to login
		if (!token) {
			window.location.href = '/login'
		} else {
			const decodedToken = jwtDecode<DecodedToken>(token)
			setUser(decodedToken)

			const isExpired =
				decodedToken.exp && decodedToken.exp < Date.now() / 1000

			// If token is expired, remove it from local storage and reload the page
			if (isExpired) {
				localStorage.removeItem('token')
				window.location.href = '/login'
			}
		}
	}, [])

	return (
		<div className='relative min-h-screen'>
			<Header />
			<main>
				<h1 className='text-xl md:text-2xl lg:text-3xl m-6 md:m-12 font-bold text-violet-950'>
					Your Profile
				</h1>
				<h2 className='mx-6 md:mx-12 text-2xl md:text-3xl lg:text-4xl'>
					Hello, {user?.name} 👋
				</h2>
			</main>
		</div>
	)
}

export default Profile
