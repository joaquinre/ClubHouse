import React, { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import styles from "./StepAvatar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setAvatar } from '../../../store/activationSlice';
import { activate } from '../../../http';


const StepAvatar = ({ onNext }) => {
  const dispatch = useDispatch()
  const {name, avatar} = useSelector((state) => state.activate)
  const [image, setImage] = useState('/images/monkey-avatar.png')
  function captureImage(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
      console.log(reader.result);
      setImage(reader.result)
      dispatch(setAvatar(reader.result))
    }
  }
  async function submit() {
    try {
      const { data } = await activate({ name, avatar }) 
      console.log(data);
    } catch (error) {
      console.log(error); 
    }
  }
  return (
    <>
      <Card title={`Okay, ${name}`} icon='monkey-emoji'>
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
                onChange={captureImage}
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