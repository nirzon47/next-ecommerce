import Image from 'next/image'
import { Button } from '../ui/button'

const OrderCardBody = ({ order }: { order: any }) => {
	return (
		<div className='border-b border-r border-l rounded-br-md rounded-bl-md border-violet-100 px-8 py-6'>
			<div className='flex justify-center md:justify-between items-center'>
				<div className='gap-4 hidden md:flex'>
					{order.cart.products.map((product: any) => (
						<div key={product._id} className='relative'>
							<Image
								src={`${process.env.NEXT_PUBLIC_SERVER}/${product.item.imagePath}`}
								alt={product.item.name}
								width={50}
								height={50}
								className='w-16 h-16 rounded-full object-cover'
							/>
							<span className='absolute top-0 right-0 text-xs text-white bg-violet-700 grid place-items-center h-4 w-4 rounded-full'>
								{product.quantity}
							</span>
						</div>
					))}
				</div>
				<Button>View Order Details</Button>
			</div>
		</div>
	)
}

export default OrderCardBody
