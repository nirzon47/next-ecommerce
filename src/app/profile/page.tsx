'use client'

import Header from '@/components/Header/Header'
import AddressForm from '@/components/Profile/AddressForm'
import { useEffect, useState } from 'react'
import { validateToken } from '@/lib/tokenValidator'
import { useRouter } from 'next/navigation'
import Wishlist from '@/components/Profile/Wishlist'

const Profile = () => {
	const [user, setUser] = useState<any>({})
	const router = useRouter()

	// Validate token
	useEffect(() => {
		const decodedToken = validateToken()
		if (decodedToken) {
			setUser(decodedToken)
		}
	}, [])

	return (
		<div className='relative min-h-screen'>
			<Header />
			<main className='grid items-start justify-center gap-6 p-4 md:px-8 md:py-12 lg:px-24 lg:py-16 md:grid-cols-2 md:gap-16'>
				<section className='space-y-6'>
					<h1 className='text-xl font-bold text-center md:text-2xl lg:text-3xl text-violet-950'>
						Your Profile
					</h1>
					<h2 className='font-mono text-xl text-center md:text-2xl lg:text-3xl'>
						Hello, {user?.name} 👋
					</h2>
					<h2 className='my-2 mt-4 text-lg font-semibold text-center md:text-xl lg:text-2xl text-violet-900'>
						Address
					</h2>
					<AddressForm disabled={false} showButton={true} />
				</section>
				<section className='space-y-6'>
					<h2 className='text-xl font-bold text-center md:text-2xl lg:text-3xl text-violet-950'>
						Your Wishlist
					</h2>
					<Wishlist />
				</section>
			</main>
		</div>
	)
}

export default Profile
