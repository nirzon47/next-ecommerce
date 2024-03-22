'use client'

import Image from 'next/image'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Header = () => {
	const [token, setToken] = useState<string>('')
	const router = useRouter()

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('token')

			if (token) {
				setToken(token)
			}
		}
	}, [])

	// Handles logout
	const handleLogout = async () => {
		// Calls the logout endpoint with the token in the header
		if (typeof window !== 'undefined') {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`,
				null,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			// If logout is successful, remove token from local storage and reload the page
			if (data.success) {
				localStorage.removeItem('token')
				window.location.reload()
			} else {
				toast.error(data.message)
			}
		}
	}

	return (
		<header className='bg-emerald-950 sticky top-0 z-50 flex items-center justify-center gap-24 py-1'>
			<div className='flex gap-2 items-center'>
				<Image src='/logo.png' alt='logo' width={50} height={50} />
				<h2 className='text-lg font-light text-emerald-50'>ShipShop</h2>
			</div>
			<form className='flex items-center bg-white px-4 rounded-full'>
				<input
					type='text'
					className='w-72 py-1 outline-none placeholder:text-sm'
					placeholder='Search...'
				/>
				<Search className='text-emerald-800 cursor-pointer' />
			</form>
			<div>
				{token ? (
					<Button variant='destructive' size={'sm'} onClick={handleLogout}>
						Logout
					</Button>
				) : (
					<Button
						variant='success'
						size={'sm'}
						onClick={() => router.push('/login')}
					>
						Login
					</Button>
				)}
			</div>
		</header>
	)
}

export default Header
