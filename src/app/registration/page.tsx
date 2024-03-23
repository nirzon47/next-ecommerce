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
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Form Schema for registration form
const formSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(4, { message: 'Password must be at least 8 characters' }),
	confirmPassword: z
		.string()
		.min(4, { message: 'Password must be at least 8 characters' }),
})

const Registration = () => {
	const router = useRouter()

	// Initialize the form
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	// Handle form submission
	const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const { firstName, lastName, email, password, confirmPassword } =
				values

			if (password !== confirmPassword) {
				toast.error("Passwords don't match")
			}

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/registration`,
				{
					firstName,
					lastName,
					email,
					password,
					role: 'buyer',
				}
			)

			if (data.success) {
				toast.success(
					'Registration successful. You will be redirected to Login page.'
				)
				setTimeout(() => {
					window.location.href = '/login'
				}, 3_000)
			} else {
				toast.error(data.message)
			}
		} catch (error) {
			toast.error('Try again')
		}
	}

	// Check if user is already logged in
	useEffect(() => {
		if (localStorage.getItem('token')) {
			router.push('/')
		}
	}, [router])

	return (
		<div className='grid h-screen place-content-center '>
			<Image
				src='/logo.png'
				alt='logo'
				width={80}
				height={80}
				className='mx-auto'
			/>
			<h1 className='mb-4 text-2xl font-light text-center'>
				Welcome to ShipShop :D
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFormSubmit)}
					className='w-64 space-y-2 md:w-80'
				>
					<div className='flex flex-col gap-2 md:flex-row'>
						<FormField
							control={form.control}
							name='firstName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter first name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='lastName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder='Enter last name' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
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
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input
										placeholder='Confirm Password'
										type='password'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Link
						href={'/login'}
						className='block text-xs duration-150 cursor-pointer text-violet-700 md:text-right hover:text-violet-900'
					>
						Already have an account? Log in!
					</Link>
					<Button className='ml-auto' type='submit'>
						Sign Up
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Registration
