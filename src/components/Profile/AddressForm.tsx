import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'

const formSchema = z.object({
	city: z.string(),
	country: z.string(),
	district: z.string(),
	state: z.string(),
	street: z.string(),
	zip: z.string(),
})

const AddressForm = () => {
	const [address, setAddress] = useState<any>({})
	const [hasAddress, setHasAddress] = useState<boolean>(true)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),

		defaultValues: {
			city: '',
			country: '',
			district: '',
			state: '',
			street: '',
			zip: '',
		},
	})

	const getAddress = useCallback(async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/address`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (!data.success) {
				setHasAddress(false)
			}

			form.reset(data.address)
			setAddress(data.address)
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
		}
	}, [form])

	useEffect(() => {
		getAddress()
	}, [getAddress])

	const handleAddressChange = async (e: any) => {
		e.preventDefault()

		const formData: any = form.getValues()
		for (const key in formData) {
			if (formData[key] === '') {
				toast.error('Please fill in all fields')
				return
			}
		}

		try {
			await axios.post(
				process.env.NEXT_PUBLIC_SERVER_URL + '/users/address',
				form.getValues(),
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			if (hasAddress) {
				toast.success('Address updated successfully')
			} else {
				toast.success('Address added successfully')
			}
		} catch (error: Error | any) {
			toast.error(error.response.data.message)
		}
	}

	return (
		<section className='mt-6'>
			<Form {...form}>
				{!hasAddress && (
					<p className='mx-6 md:mx-12 my-4 text-lg'>
						Oops, you don&apos;t have an address saved. Now is a great
						time to add one!
					</p>
				)}

				<form className='mx-6 md:mx-12 space-y-4'>
					<div className='flex gap-4'>
						<FormField
							control={form.control}
							name='street'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Street</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter street name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='city'
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder='Enter city name' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className='flex gap-4'>
						<FormField
							control={form.control}
							name='district'
							render={({ field }) => (
								<FormItem>
									<FormLabel>District</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter district name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='zip'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Zip code</FormLabel>
									<FormControl>
										<Input placeholder='Enter zip code' {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<div className='flex gap-4'>
						<FormField
							control={form.control}
							name='state'
							render={({ field }) => (
								<FormItem>
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter state name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='country'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input
											placeholder='Enter country name'
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' onClick={handleAddressChange}>
						{!hasAddress ? 'Add Address' : 'Update Address'}
					</Button>
				</form>
			</Form>
		</section>
	)
}

export default AddressForm
