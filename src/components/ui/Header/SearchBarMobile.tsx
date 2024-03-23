import clsx from 'clsx'

const SearchBarMobile = ({ showSearchBar }: { showSearchBar: boolean }) => {
	return (
		<div
			className={clsx(
				showSearchBar ? 'flex' : 'hidden',
				'pb-4 items-center justify-center'
			)}
		>
			<form
				className='w-full mx-4'
				onSubmit={(e) => {
					e.preventDefault()
					console.log('hi')
				}}
			>
				<input
					type='text'
					className='w-full px-4 py-1 text-sm rounded-full outline-none '
					placeholder='Search products'
				/>
			</form>
		</div>
	)
}

export default SearchBarMobile
