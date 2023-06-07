import { useState, useEffect } from "react"
import { useAuth } from "./security/AuthContext"
import { retrieveLeaderboardApi, retrieveProfilePictureApi } from "./api/UserApiService"

import './LeaderboardComponent.css'

function LeaderboardComponent() {

    // Authentication 
    const authContext = useAuth()
    const username = authContext.username

    const [users, setUsers] = useState([])

    // Refresh the list
    useEffect ( () => retrieveUsers(), [])

    const retrieveUsers = () => {
        retrieveLeaderboardApi(username) 
            .then(response => {
                setUsers(response.data)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    const byteArrayToBase64 = (bytes) => {
        if(bytes == null) return ''
        const base64String = bytes.toString('hex')
        console.log(base64String)
        return base64String
    }

    //make a sepearate api call for each persons profilepicture

    return (
        <div className="leaderboardComponent">
            <table className="table">
                <thead>
                    <tr className='tableHead'>
                        <th>Photo</th>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Date Set</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map(user =>
                        <tr className='tableRow' key={user.username}>
                            <td><img className='image' src={byteArrayToBase64(user.imageData)}/></td>
                            <td>{user.username}</td>
                            <td>{user.score}</td>
                            <td>{(user.date != null ? user.date.toString() : 'N/A')}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default LeaderboardComponent

