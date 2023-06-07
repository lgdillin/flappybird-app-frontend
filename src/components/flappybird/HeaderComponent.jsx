import {Link} from 'react-router-dom'
import { useAuth } from './security/AuthContext'
import { useNavigate} from 'react-router-dom'

import './HeaderComponent.css'

function HeaderComponent() {

    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const username = authContext.username

    const navigate = useNavigate()

    function logout() {
        authContext.logout()
    }

    function landingPage() {
        if(isAuthenticated) {
            navigate(`/welcome/${username}`)
        } else {
            navigate(`/`)
        }
    }

    const welcomePage = `/welcome/${username}`
    const profilePage = `/${username}/profile`
    const leaderboard =  '/leaderboard'

    return (
        
        <header className="nothing">
            <div className='headerComponent'>
                <div className='container'>
                    <div className='logo'>
                        {isAuthenticated && <Link className="logo" to={welcomePage} >Flappy Bird</Link>}
                        {!isAuthenticated && <Link className="logo" to='/' >Flappy Bird</Link>}
                    </div>
                
                    
                    <div className='navbar-split-l'>
                        {isAuthenticated && <Link className="link" to={welcomePage}>Home</Link>}
                        {isAuthenticated && <Link className="link" to={profilePage}>Profile</Link>}
                        {isAuthenticated && <Link className="link" to={leaderboard}>Leaderboard</Link>}
                        {isAuthenticated && <Link className="link" to="/game">Play</Link>} 
                        {/* {!isAuthenticated && <Link className="nav-link-uath" to="/login">Login</Link>}  */}
                    </div>
                    <div className='navbar-split-r'>   
                        {isAuthenticated && <Link className="link" to="/logout" onClick={logout}>Logout</Link>}                                
                        {!isAuthenticated && <Link className="link" to="/login">Login</Link>}                                    
                        {!isAuthenticated && <Link className="link" to="/signup">Signup</Link>}
                    
                    </div>
                       
                </div>
                
            </div>
        </header>

    )
}

export default HeaderComponent