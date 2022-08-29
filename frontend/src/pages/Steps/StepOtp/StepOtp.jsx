import React from 'react'
import { useState } from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from  './StepOtp.module.css'

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState('')
  async function submit() {
    
    // onNext()
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