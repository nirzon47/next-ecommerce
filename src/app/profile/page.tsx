'use client'

import Header from '@/components/Header/Header'
import AddressForm from '@/components/Profile/AddressForm'
import { useEffect, useState } from 'react'
import { validateToken } from '@/lib/tokenValidator'
import { Button } from '@/components/ui/button'
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
			<main className='grid items-start justify-center gap-6 px-24 py-16 md:grid-cols-3 md:gap-16'>
				<section className='space-y-6'>
					<h1 className='text-xl font-bold md:text-2xl lg:text-3xl text-violet-950'>
						Your Profile
					</h1>
					<h2 className='font-mono text-2xl md:text-3xl lg:text-4xl'>
						Hello, {user?.name} 👋
					</h2>
					<h2 className='my-2 mt-4 text-lg font-semibold md:text-xl lg:text-2xl text-violet-900'>
						Address
					</h2>
					<AddressForm />
				</section>
				<section className='space-y-6'>
					<h2 className='text-xl font-bold text-center md:text-2xl lg:text-3xl text-violet-950'>
						Your Wishlist
					</h2>
					<Wishlist />
				</section>
				<section className='space-y-6'>
					<h2 className='text-xl font-bold text-right md:text-2xl lg:text-3xl text-violet-950'>
						Your Orders
					</h2>

					<p className='text-right'>
						<a
							className='inline-block duration-200 text-violet-800 hover:text-violet-600 hover:underline underline-offset-4'
							onClick={() => router.push('/orders')}
							href='/orders'
						>
							Order Page
						</a>
					</p>
				</section>
			</main>
		</div>
	)
}

export default Profile
