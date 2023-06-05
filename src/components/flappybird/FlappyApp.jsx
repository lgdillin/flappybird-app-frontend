
// React Libraries
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

// Project Security and Authorization
import AuthProvider, { useAuth } from './security/AuthContext'

// Project Components
import HeaderComponent from './HeaderComponent'
import FooterComponent from './FooterComponent'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import ErrorComponent from './ErrorComponent'
import LogoutComponent from './LogoutComponent'
import ProfileComponent from './ProfileComponent'
import CreateUserComponent from './CreateUserComponent'

import GameComponent from './GameComponent'

// css
import './FlappyApp.css'
import LeaderboardComponent from './LeaderboardComponent'

// Wraps the Routes in an authenticated block
function AuthenticatedRoute({children}) {
    const authContext = useAuth()
    
    if(authContext.isAuthenticated)
        return children

    return <Navigate to="/" />
}

export default function FlappyApp() {
    return ( 
        <div className="FlappyApp">
            <AuthProvider>
                <BrowserRouter>

                    <HeaderComponent />
                    <Routes>
                        
                        {/* Home, Login, Signup Route */}
                        <Route path='/' element={<LoginComponent />} />
                        <Route path='/login' element={<LoginComponent />} />
                        <Route path='/signup' element={<CreateUserComponent />} />

                        {/* Logged-in user Landing Page */}
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute> 
                        } />

                        {/* Route user to logout page, triggering session end */}
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent /> 
                            </AuthenticatedRoute>
                        } />


                        {/* Page to play the flappy-bird knock off age */}
                        <Route path='/game' element={
                            <AuthenticatedRoute>
                                <GameComponent />
                            </AuthenticatedRoute>
                        } />

                        {/* Go to the leaderboard */}
                        <Route path='/leaderboard' element={
                            <AuthenticatedRoute>
                                <LeaderboardComponent />
                            </AuthenticatedRoute>
                        } />

                        {/* Change a user's Profile */}
                        <Route path='/:username/profile' element={
                            <AuthenticatedRoute>
                                <ProfileComponent />
                            </AuthenticatedRoute>
                        } />
                        
                        {/* Catch-all for any incorrect route */}
                        <Route path='*' element={<ErrorComponent /> } />

                    </Routes>

                    <FooterComponent />

                </BrowserRouter>
            </AuthProvider>
        </div>
    )
}