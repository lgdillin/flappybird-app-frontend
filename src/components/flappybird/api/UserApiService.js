import { apiClient } from './ApiClient'


// Production API request
// export const updateUserProfile
//     = (username, userProfile) => apiClient.put(`/${username}/profile`, userProfile)

// Developement API request
export const updateUserProfile 
    = (username, userProfile) => apiClient.put(`/${username}/profile`, userProfile)

export const retrieveLeaderboardApi
    = (username) => apiClient.get('/leaderboard')

// Retrieve a user's profile picture
export const retrieveProfilePictureApi
    = (username) => apiClient.get(`/${username}/profile/image`)

export const createUserApi 
    = (user) => apiClient.post(`/createuser`, user)

export const submitGameScore
    = (username, score) => apiClient.put(`/users/${username}/game/${score}`)

