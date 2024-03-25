'use client'

import Header from '@/components/Header/Header'
import AddressForm from '@/components/Profile/AddressForm'
import { useEffect, useState } from 'react'
import { validateToken } from '@/lib/tokenValidator'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

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
			<main className='flex flex-col gap-6 md:flex-row md:gap-12 lg:gap-28'>
				<section>
					<h1 className='text-xl md:text-2xl lg:text-3xl m-6 md:m-12 font-bold text-violet-950'>
						Your Profile
					</h1>
					<h2 className='mx-6 md:mx-12 text-2xl md:text-3xl lg:text-4xl'>
						Hello, {user?.name} 👋
					</h2>
					<h2 className='mx-6 md:mx-12 text-lg md:text-xl lg:text-2xl my-2 mt-4 font-semibold text-violet-900'>
						Addresses
					</h2>
					<AddressForm />
				</section>
				<section>
					<h2 className='text-xl md:text-2xl lg:text-3xl m-6 md:m-12 font-bold text-violet-950'>
						Your Orders
					</h2>
					<Button
						className='mx-6 md:mx-12 mb-8'
						onClick={() => router.push('/orders')}
						variant={'link'}
					>
						Order Page
					</Button>
				</section>
			</main>
		</div>
	)
}

export default Profile
