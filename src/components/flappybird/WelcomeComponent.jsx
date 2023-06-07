import { useParams } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "./security/AuthContext"
import { GameComponent } from "./GameComponent"
import { submitGameScore, retrieveProfilePictureApi, testRetrieveUsername } from "./api/UserApiService"


export default function WelcomeComponent() {

    //const { username } = useParams()
    const [message, setMessage] = useState()
    const [profileImage, setProfileImage] = useState('')

    const authContext = useAuth()
    const username = authContext.username

    function sendTestApi() {
        submitGameScore('user1', 1237567)
        .then((response) => successfulResponse(response))
        .catch((error) => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

    function testCallback(response) {
        console.log(response)
    }

    function successfulResponse(response) {
        console.log('axios success')
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log('axios error')
        console.log(error)
    }

    const fetchProfileImage = () => {
        retrieveProfilePictureApi(username)
        .then(response => {
            console.log(response)
            setProfileImage(response.data.imageData)
        })
        .catch(error => console.log(error))
    }

    const testApi = () => {
        testRetrieveUsername(username)
        .then(response => console.log(response))
        .catch(error => console.log(error))

        console.log(authContext.token)
    }

    return (
        <div className="WelcomeComponent">
            <h1>Welcome {username}</h1>
            <div>
                <button className="btn btn-success m-5" onClick={testApi}>
                    Call testapi
                </button>
            </div>

            <div>
                <button className="btn btn-success m-5" onClick={fetchProfileImage}>
                    Test receive image
                </button>
            </div> 

            <div>
            <img src={profileImage} width="200" height="200" style={{objectFit: "scale-down"}}/>
            </div>



        </div>
    )
}