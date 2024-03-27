import Image from 'next/image'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/app/store/store'
import { setCartTotal } from '@/app/store/cartSlice'

const CartItem = ({ item }: { item: any }) => {
	const [total, setTotal] = useState<number>(item.item.price * item.quantity)
	const cartTotal = useAppSelector((state) => state.cart.total)
	const dispatch = useAppDispatch()

	const changeQuantity = async (e: any) => {
		try {
			await axios.patch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/quantity`,
				{
					item: item.item._id,
					quantity: e,
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			const difference = total - item.item.price * e

			dispatch(setCartTotal(cartTotal - difference))
			setTotal(item.item.price * e)
			toast.success('Quantity updated successfully')
		} catch (error) {
			console.error(error)
			toast.error('Failed to update quantity. Maybe your session expired?')
		}
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='flex gap-8'>
				<Image
					src={`${process.env.NEXT_PUBLIC_SERVER}/${item.item.imagePath}`}
					alt={item.item.name}
					width={100}
					height={100}
					className='object-cover w-20 h-20 rounded-md lg:w-24 lg:h-24'
				/>
				<div className='flex items-center gap-12'>
					<div className='grid gap-2 p-4 w-36'>
						<h2 className='text-lg font-semibold text-violet-900'>
							{item.item.name}
						</h2>
						<p className='text-zinc-500'>₹{item.item.price}</p>
					</div>
					<div className='flex gap-4'>
						<Select onValueChange={changeQuantity}>
							<SelectTrigger className='w-20'>
								<SelectValue
									defaultValue={item.quantity}
									placeholder={item.quantity}
								/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='1'>1</SelectItem>
								<SelectItem value='2'>2</SelectItem>
								<SelectItem value='3'>3</SelectItem>
								<SelectItem value='4'>4</SelectItem>
								<SelectItem value='5'>5</SelectItem>
								<SelectItem value='6'>6</SelectItem>
								<SelectItem value='7'>7</SelectItem>
								<SelectItem value='8'>8</SelectItem>
								<SelectItem value='9'>9</SelectItem>
								<SelectItem value='10'>10</SelectItem>
							</SelectContent>
						</Select>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<Trash2 className='text-red-500 duration-200 hover:text-red-800' />
								</TooltipTrigger>
								<TooltipContent>
									<p>Remove from cart</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>
			<div>
				<p className='font-bold text-violet-800'>₹{total}</p>
			</div>
		</div>
	)
}

export default CartItem
