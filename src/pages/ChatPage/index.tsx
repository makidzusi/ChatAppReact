import { getUsersListAsync } from "@/api/users";
import UserDTO from "@/types/UserDTO";
import { useEffect, useState } from "react";
import ChatOutlet from "./components/ChatOutlet";
import Sidebar from "./components/Sidebar";

export default function ChatPage() {

    const [users,setUsers] = useState<UserDTO[]>([])
    const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null)

    useEffect(() => {
        getUsersListAsync().then(res => {
            setUsers(res)
        })
    }, [])

    const handleUserChamge = (user : UserDTO) => {
        console.log("aboba")
        setSelectedUser(user)
    }

    return (
        <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900 overflow-hidden">
            <div className="flex-1 flex flex-col">
                <main className="flex-grow flex flex-row min-h-0">
                    <Sidebar onUserChange={handleUserChamge} users={users} />
                    <ChatOutlet user={selectedUser}/>
                </main>
            </div>
        </div>
    )
}