import { Search } from 'lucide-react'

const SearchBar = () => {
	return (
		<form
			className='items-center hidden px-4 bg-white rounded-full md:flex'
			onSubmit={(e) => {
				e.preventDefault()
				console.log('hi')
			}}
		>
			<input
				type='text'
				className='md:w-64 lg:w-96 py-1.5 pl-2 outline-none placeholder:text-sm'
				placeholder='Search products'
			/>
			<button type='submit'>
				<Search className='duration-200 cursor-pointer text-violet-800 hover:text-violet-500' />
			</button>
		</form>
	)
}

export default SearchBar
