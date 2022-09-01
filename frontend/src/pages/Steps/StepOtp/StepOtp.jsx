import React from 'react'
import { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from  './StepOtp.module.css'
import { verifyOtp } from '../../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState('')
  const dispatch = useDispatch()
  const { phone, hash } = useSelector((state) => state.auth.otp)

  async function submit() {
    try {
     const { data } = await verifyOtp({ otp, phone, hash }) 
    //  console.log(data);
     dispatch(setAuth(data))
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title='Enter the coded we just text you' icon='lock-emoji'>
          <TextInput 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            />
          <div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text='Next'/>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default StepOtp