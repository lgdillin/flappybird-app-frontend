import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

import './HeaderComponent.css'

function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const username = authContext.username

    function logout() {
        authContext.logout()
    }

    const welcomePage = `/welcome/${username}`
    const profilePage = `/${username}/profile`
    const leaderboard =  '/leaderboard'

    return (
        
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className='headerComponent'>
                <div className='container'>
                    <div className='logo'>Flappy Bird</div>
                    
                        <div className='navbar'>
                            {isAuthenticated && <Link className="nav-link-auth" to={welcomePage}>Home</Link>}
                            {isAuthenticated && <Link className="nav-link-auth" to={profilePage}>Profile</Link>}
                            {isAuthenticated && <Link className="nav-link-auth" to={leaderboard}>Leaderboard</Link>}
                            {/* {!isAuthenticated && <Link className="nav-link-uath" to="/login">Login</Link>}  */}
                        </div>
                        <div className='login-logout'>
                            {isAuthenticated && <Link className="nav-link-auth" to="/game">Play</Link>}                                    
                            {!isAuthenticated && <Link className="nav-link-uath" to="/login">Login</Link>}                                    
                            {!isAuthenticated && <Link className="nav-link-uath" to="/signup">Signup</Link>}
                        
                        </div>
                </div>
                
            </div>
        </header>

    )
}

export default HeaderComponent