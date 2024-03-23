'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

// Form Schema for login form
const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 8 characters' }),
})

const Login = () => {
	const router = useRouter()
	// Initialize the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	// Handle form submission
	const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { email, password } = values

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/login`,
				{
					email,
					password,
				}
			)

			// If log in is successful, store token in local storage
			if (data.success) {
				localStorage.setItem('token', data.token)
				window.location.href = '/'
			}
		} catch (error) {
			toast.error('Invalid email or password')
		}
	}

	// Check if user is already logged in
	useEffect(() => {
		if (localStorage.getItem('token')) {
			router.push('/')
		}
	}, [router])

	return (
		<div className='grid h-screen place-content-center'>
			<Image
				src='/logo.png'
				alt='logo'
				width={80}
				height={80}
				className='mx-auto'
			/>
			<h1 className='mb-4 text-2xl font-light text-center'>
				Welcome Back :)
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFormSubmit)}
					className='w-64 space-y-2 md:w-80'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter email'
										type='email'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder='Enter password'
										type='password'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<Link
						href={'/registration'}
						className='block text-xs duration-150 cursor-pointer text-violet-700 md:text-right hover:text-violet-900'
					>
						Don&apos;t have an account? Sign up!
					</Link>
					<Button className='ml-auto' type='submit'>
						Log In
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Login
