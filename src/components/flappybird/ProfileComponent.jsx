import { useState } from "react"
import { useParams, useNavigate} from 'react-router-dom'
import { updateUserImage } from './api/UserApiService'
import { useAuth } from './security/AuthContext'
import {Formik, Form, Field, ErrorMessage } from 'formik'

import styled from 'styled-components'

import './ProfileComponent.css'

const ProfileComponent = () => {

    const {id} = useParams()

    const [myPhoto, setMyPhoto] = useState('')
    const [screenName, setScreenName] = useState('')

    const authContext = useAuth()
    const navigate = useNavigate()
    
    const username = authContext.username

    const reader = (file) =>
        new Promise((resolve, reject) => {
            const fr = new FileReader()

            fr.onload = () => resolve(fr)
            fr.onerror = (err) => reject(err)
            fr.readAsDataURL(file)
        })

    const handleChange = async (event) => {
        const photo = event.target.files[0]
        const myValue = await reader(photo)
        setMyPhoto(myValue.result)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        const userProfile = {
            imageData: myPhoto
        }

        console.log(userProfile)

        updateUserImage(username, myPhoto)
        .then(() => {
            //console.log(response.data)
            navigate(`/welcome/${username}`)
        })
        // .catch(error => {
        //     console.log('here')
        //     console.log(error)
        // }).finally(response => {
        //     console.log('test')
        // })
    }

    function validate(values) {
        let errors = {
            // targetDate: 'Enter a valid target date'
        }


        // Count these conditions as the username is unchanged
        const screenNameUnchanged = values.screenName == null || values.screenName==''
        if(!screenNameUnchanged && values.screenName.length < 5) { 
            errors.screenName = 'Screen Name is too short'
        }


        return errors
    }


    return (
        <div className="ProfileComponent">
            <img src={myPhoto} width="200" height="200" style={{objectFit: "scale-down"}}/>
            <form onSubmit={onSubmit}>
                <div className="userDetails">
                    <h1 className="profileHeader">Update Profile</h1>
                </div>
                <div className="detailsBlock">
                    <div>
                        <h5>Update user Info:</h5>
                        {/* Screen Name<input type="text" className="form-control" name="screenName" /> */}
                        </div>
                    <div></div>
                </div>


                <input type="file" onChange={handleChange} />

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ProfileComponent
