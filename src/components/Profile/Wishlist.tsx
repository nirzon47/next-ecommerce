import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import WishlistProductCard from './WishlistProductCard'

const Wishlist = () => {
	const [isWishlistEmpty, setIsWishlistEmpty] = useState(true)
	const [products, setProducts] = useState<any>([])

	const getWishlist = useCallback(async () => {
		try {
			const data = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_URL}/users/wishlist`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)

			setIsWishlistEmpty(data.data.wishlist.length === 0)
			setProducts(data.data.wishlist)
		} catch (error) {}
	}, [])

	useEffect(() => {
		getWishlist()
	}, [getWishlist])

	return (
		<div>
			{isWishlistEmpty ? (
				<p className='text-lg md:text-xl lg:text-2xl text-violet-950'>
					Wishlisting products is free you know :D
				</p>
			) : (
				<div className='grid'>
					{products.map((product: any) => (
						<WishlistProductCard key={product._id} product={product} />
					))}
				</div>
			)}
		</div>
	)
}

export default Wishlist
