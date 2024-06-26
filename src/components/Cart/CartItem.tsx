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
import { setCart, setCartTotal } from '@/app/store/cartSlice'

const CartItem = ({ item }: { item: any }) => {
	const [total, setTotal] = useState<number>(item.item.price * item.quantity)
	const cartTotal = useAppSelector((state) => state.cart.total)
	const cart = useAppSelector((state) => state.cart.cart)
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

	const removeFromCart = async () => {
		try {
			await axios.patch(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/`,
				{
					item: item.item._id,
					variant: item.variant || 'Default',
				},
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			dispatch(setCartTotal(cartTotal - total))
			const cartIndex = cart.cart.products.findIndex(
				(product: any) =>
					product._id === item._id && product.variant === item.variant
			)
			const updatedCartProducts = [...cart.cart.products]
			updatedCartProducts.splice(cartIndex, 1)

			dispatch(
				setCart({
					...cart,
					cart: { ...cart.cart, products: updatedCartProducts },
				})
			)
			toast.success('Removed from cart')
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center md:gap-8'>
				<Image
					src={`${process.env.NEXT_PUBLIC_SERVER}/${item.item.imagePath}`}
					alt={item.item.name}
					width={100}
					height={100}
					className='object-cover w-20 h-20 rounded-md lg:w-24 lg:h-24'
				/>
				<div className='flex flex-col items-center md:flex-row md:gap-12'>
					<div className='grid gap-2 p-4 w-36'>
						<h2 className='font-semibold md:text-lg text-violet-900'>
							{item.item.name}
						</h2>
						<p className='text-sm md:text-base text-zinc-500'>
							₹{item.item.price}
						</p>
					</div>
					<div className='flex gap-2 md:gap-4'>
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
									<Trash2
										className='text-red-500 duration-200 hover:text-red-800'
										onClick={removeFromCart}
									/>
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
