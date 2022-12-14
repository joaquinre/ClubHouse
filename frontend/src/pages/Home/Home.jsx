import React from 'react'
import styles from  './Home.module.css'
import { Link, useHistory } from 'react-router-dom'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'

const Home = () => {
    const signInLinkStyle = {
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px'
    }

    const history = useHistory()
    function startRegister() {
        history.push('/authenticate')
    }

  return (
    <div className={styles.cardWrapper}>
       <Card title='Welcome to CoderHouse!'>
            <p className={styles.text}>
                We're working hard to get Codershouse really for everyone! While
                we wrap up the finishing youches, we're adding people gradually
                to make sure nothing breaks 
            </p>
            <div>
                <Button onClick={startRegister} text='Lets Go!'/>
            </div>
            <div className={styles.signinWrapper}>
                <span className={styles.hasInvite}>Have an invite text?</span>
                <Link style={signInLinkStyle} to='/login'>Sign In</Link>
            </div>
        </Card>
    </div>
  )
}

export default Home