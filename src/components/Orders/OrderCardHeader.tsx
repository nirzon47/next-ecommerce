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
		<div className='bg-violet-100 flex flex-row justify-between rounded-tr-md rounded-tl-md items-center px-4 py-2'>
			<div className='flex flex-col md:flex-row md:gap-16'>
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
					<span className='text-sm text-zinc-500'>
						<span className='md:hidden'>
							{_id.substring(_id.length - 8)}
						</span>
						<span className='hidden md:inline'>{_id}</span>
					</span>
				</div>
			</div>
			<div className='flex flex-col md:flex-row md:gap-16'>
				<div className='grid gap-1'>
					<span className='text-xs text-violet-700 font-semibold text-right md:text-left'>
						<span className='hidden md:inline'>PAYMENT</span> MODE
					</span>
					<span className='text-sm text-zinc-500 text-right md:text-left'>
						{paymentMode}
					</span>
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
