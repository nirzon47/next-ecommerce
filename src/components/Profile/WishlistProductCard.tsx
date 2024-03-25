import { ShoppingBagIcon, Trash } from 'lucide-react'
import Image from 'next/image'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

const WishlistProductCard = ({ product }: { product: any }) => {
	// TODO: Add links to the product page when its ready

	return (
		<div className='flex gap-6 p-4 border rounded-md border-violet-100'>
			<Image
				src={`${process.env.NEXT_PUBLIC_SERVER}/${product.imagePath}`}
				alt={product.name}
				width={200}
				height={200}
				className='object-cover w-16 h-16 rounded-md lg:w-20 lg:h-20'
			/>
			<div className='flex items-center justify-between w-full'>
				<div>
					<h3 className='font-semibold text-violet-800'>{product.name}</h3>
					<p className='font-medium'>₹{product.price}</p>
				</div>
				{/* TODO: Add appropriate API calls when clicked on bag icon */}
				<div className='space-x-2'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<a className='grid w-10 h-10 duration-200 rounded-full cursor-pointer lg:scale-100 md:scale-90 bg-violet-800 place-content-center hover:bg-violet-600'>
									<ShoppingBagIcon className='text-white' />
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<p>Add to cart</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<a className='grid w-10 h-10 duration-200 bg-red-500 rounded-full cursor-pointer lg:scale-100 md:scale-90 place-content-center hover:bg-red-600'>
									<Trash className='text-white' />
								</a>
							</TooltipTrigger>
							<TooltipContent>
								<p>Delete from wishlist</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	)
}

export default WishlistProductCard
