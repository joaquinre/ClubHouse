import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";


const StepAvatar = ({ onNext }) => {
  const {name} = useSelector((state) => state.activate)
  const [image, setImage] = useState('/images/monkey-avatar.png')
  function submit(params) {
    
  }
  return (
    <>
      <Card title={`Okay, ${name}!`} icon='monkey-emoji'>
          <p className={styles.subHeading}>How's this photo?</p>
            <div className={styles.avatarWrapper}>
              <img
                className={styles.avatarImage}
                src={image} 
                alt="avatar"
              />
            </div>
            <div>
              <input
                id='avatarInput' 
                type="file" 
                className={styles.avatarInput}
              />
              <label className={styles.avatarLabel} htmlFor="avatarInput">
                Choose a diferent photo
              </label>
            </div>
            <div>
              <Button onClick={submit} text='Next'/>
            </div>
      </Card>
    </>
  )
}

export default StepAvatar