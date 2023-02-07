import UserDTO from "@/types/UserDTO"
import $axios from "../axios"

export default function getUsersListAsync () : Promise<UserDTO[]> {
    return new Promise((resolve, reject) => {
        $axios.get('users/list')
        .then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}