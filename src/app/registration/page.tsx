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

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
	confirmPassword: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters' }),
})

const Page = () => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<div className='grid place-content-center h-screen'>
			<Image
				src='/logo.png'
				alt='logo'
				width={80}
				height={80}
				className='mx-auto'
			/>
			<h1 className='text-2xl font-light text-center mb-4'>
				Welcome to ShipShop
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleFormSubmit)}
					className='space-y-2 w-80'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Enter email' {...field} />
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
									<Input placeholder='Enter password' {...field} />
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
									<Input placeholder='Confirm Password' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<a className='text-emerald-700 text-xs text-right block cursor-pointer hover:text-emerald-900 duration-150'>
						Already have an account? Log in!
					</a>
					<Button className='ml-auto' type='submit'>
						Submit
					</Button>
				</form>
			</Form>
		</div>
	)
}

export default Page
