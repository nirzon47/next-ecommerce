const OrderCardHeader = ({
	paymentMode,
	total,
	_id,
	date,
}: {
	paymentMode: string
	total: number
	_id: string
	date: string
}) => {
	return (
		<div className='bg-violet-100 flex justify-between rounded-tr-md rounded-tl-md items-center px-4 py-2'>
			<div className='flex gap-16'>
				<div className='grid gap-1'>
					<span className='text-xs text-violet-700 font-semibold'>
						PLACED ON
					</span>
					<span className='text-sm text-zinc-500'>{date}</span>
				</div>
				<div className='grid gap-1'>
					<span className='text-xs text-violet-700 font-semibold'>
						ORDER ID
					</span>
					<span className='text-sm text-zinc-500'>{_id}</span>
				</div>
			</div>
			<div className='flex gap-16'>
				<div className='grid gap-1'>
					<span className='text-xs text-violet-700 font-semibold'>
						PAYMENT MODE
					</span>
					<span className='text-sm text-zinc-500'>{paymentMode}</span>
				</div>
				<div className='grid gap-1 text-right'>
					<span className='text-xs text-violet-700 font-semibold'>
						TOTAL
					</span>
					<span className='text-sm text-zinc-500'>₹{total}</span>
				</div>
			</div>
		</div>
	)
}

export default OrderCardHeader
