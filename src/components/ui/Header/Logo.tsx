import Image from 'next/image'

const Logo = () => {
	return (
		<div
			className='flex items-center gap-2 duration-100 cursor-pointer hover:scale-105'
			onClick={() => (window.location.href = '/')}
		>
			<Image src='/logo.png' alt='logo' width={50} height={50} />
			<h2 className='text-lg text-violet-50'>ShipShop</h2>
		</div>
	)
}

export default Logo
