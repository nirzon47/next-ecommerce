import { Search } from 'lucide-react'

const SearchBar = () => {
	return (
		<form
			className='flex items-center px-4 bg-white rounded-full'
			onSubmit={(e) => {
				e.preventDefault()
				console.log('hi')
			}}
		>
			<input
				type='text'
				className='w-96 py-1.5 pl-2 outline-none placeholder:text-sm'
				placeholder='Search products'
			/>
			<button type='submit'>
				<Search className='duration-200 cursor-pointer text-violet-800 hover:text-violet-500' />
			</button>
		</form>
	)
}

export default SearchBar
