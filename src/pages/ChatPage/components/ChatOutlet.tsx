import UserDTO from "@/types/UserDTO"

interface ChatOutletProps {
    user: UserDTO | null
}

export default function ChatOutlet({ user }: ChatOutletProps) {
    return (
        user ? <section className="flex flex-col flex-auto border-l border-gray-800">
            <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
                <div className="flex">
                    <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
                        <img className="shadow-md rounded-full w-full h-full object-cover"
                            src="https://randomuser.me/api/portraits/women/33.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text-sm">
                        <p className="font-bold">{user.name}</p>
                        {/* <p>Active 1h ago</p> */}
                    </div>
                </div>
            </div>
            <div className="chat-body p-4 flex-1 overflow-y-scroll">

            </div>
            <div className="chat-footer flex-none">
                <div className="flex flex-row items-center p-4">

                    <div className="relative flex-grow">
                        <label>
                            <input className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                                type="text" placeholder="Aa" />
                            {/* <button type="button" className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6">
                            <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                                <path d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z" />
                            </svg>
                        </button> */}
                        </label>
                    </div>
                </div>
            </div>
        </section> : null
    )
}