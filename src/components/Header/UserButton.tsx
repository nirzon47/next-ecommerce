import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserIcon } from 'lucide-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const UserButton = ({ token }: { token: string }) => {
	const router = useRouter()

	// Handles logout
	const handleLogout = async () => {
		// Calls the logout endpoint with the token in the header
		try {
			if (typeof window !== 'undefined') {
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`,
					null,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)

				// If logout is successful, remove token from local storage and reload the page
				if (data.success) {
					localStorage.removeItem('token')
					window.location.reload()
				} else {
					toast.error(data.message)
				}
			}
		} catch (error) {
			window.location.reload()
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='outline-none'>
				<UserIcon className='duration-200 cursor-pointer text-violet-50 hover:text-violet-300' />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className='cursor-pointer'
					onClick={() => {
						router.push('/profile')
					}}
				>
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer'
					onClick={() => {
						router.push('/orders')
					}}
				>
					Orders
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={handleLogout}
					className='text-red-600 cursor-pointer focus:text-red-400'
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default UserButton
