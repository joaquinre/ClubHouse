import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../../../http'
import styles from './Navigation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'

const Navigation = () => {
    const brandStyle = {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '22px',
        display: 'flex',
        alignItems: 'center'
    }

    const logoText = {
        marginLeft: '10px'
    }

    const dispatch = useDispatch()
    const { isAuth, user } = useSelector((state) => state.auth)
    async function logoutUser() {
        try {
            const { data } = await logout()
            dispatch(setAuth(data))
            
        } catch (error) {
           console.log(error); 
        }
    }
  return (
    <nav className={`${styles.navbar} container`}>
        <Link style={brandStyle} to="/">
            <img src="/images/logo.png" alt="" />
            <span style={logoText}>CodersHouse</span>
        </Link>
        {isAuth && (
            <div className={styles.navRight}>
                <h3>{user?.name}</h3>
                {user.avatar && (
                    <Link to='/'>
                        <img 
                            className={styles.avatar}
                            src={user.avatar}
                            width='40'
                            height='40' 
                            alt='avatar'
                            />
                    </Link>
                )}
                <button className={styles.logoutButton} onClick={logoutUser}>
                    <img src="/images/logout.png" alt="logout" />
                </button>
            </div>
        )}
    </nav>
  )
}

export default Navigation