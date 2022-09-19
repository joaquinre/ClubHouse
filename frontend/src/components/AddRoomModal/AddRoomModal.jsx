import React from 'react'
import styles from  './AddRoomModal.module.css'
import TextInput from '../shared/TextInput/TextInput'

const AddRoomModal = ({ onClose }) => {
  return (
    <div className={styles.modalMask}>
        <div className={styles.modalBody}>
            <button onClick={onClose} className={styles.closeButton}>
                <img src="/images/close.png" alt="" />
            </button>
            <div className={styles.modalHeader}>
                <h3>Enter the topic to be desscussed</h3>
                <TextInput fullwidth="true"/> 
                <h2>Room Types</h2>
                <div className={styles.roomTypes}>
                    <div className={styles.typeBox}>
                        <img src="/images/globe.png" alt="globe" />
                        <span>Open</span>
                    </div>
                    <div className={styles.typeBox}>
                        <img src="/images/social.png" alt="social" />
                        <span>Friends</span>
                    </div>
                    <div className={styles.typeBox}>
                        <img src="/images/lock.png" alt="lock" />
                        <span>Private</span>
                    </div>

                </div>
            </div>
            <div className={styles.modalFooter}>
                <h2>Start a room, open to everyone</h2>
                <button className={styles.footerButton}>
                    <img src="/images/celebration.png" alt="celebration"/>
                    <span>Let's go</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddRoomModal