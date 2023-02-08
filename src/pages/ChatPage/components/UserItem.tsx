import UserDTO from "@/types/UserDTO"
import { FC } from "react"

interface UserItemProps {
    user: UserDTO,
    onClick: () => void
}

const UserItem : FC<UserItemProps> = (props) => {
    const {user} = props
    
    return (
        <div onClick={() => props.onClick()} className="flex justify-between items-center p-3 hover:bg-gray-800 rounded-lg relative cursor-pointer">
            <div className="w-16 h-16 relative flex flex-shrink-0">
                <img className="shadow-md rounded-full w-full h-full object-cover"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="User2"
                />
            </div>
            <div className="flex-auto min-w-0 ml-4 mr-6 hidden md:block group-hover:block">
                <p>{user.name}</p>
                {/* <div className="flex items-center text-sm text-gray-600">
                    <div className="min-w-0">
                        <p className="truncate">Happy birthday to you my friend!
                        </p>
                    </div>
                    <p className="ml-2 whitespace-no-wrap">2 Oct</p>
                </div> */}
            </div>
            <div className="w-4 h-4 flex flex-shrink-0 hidden md:block group-hover:block">
                <img className="rounded-full w-full h-full object-cover" alt="user2"
                    src="https://randomuser.me/api/portraits/men/32.jpg" />
            </div>
        </div>
    )
}

export default UserItem
