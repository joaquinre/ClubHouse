import React, { useState} from 'react'
import Button from '../../../components/shared/Button/Button'
import Card from '../../../components/shared/Card/Card'
import TextInput from '../../../components/shared/TextInput/TextInput'
import styles from  './StepName.module.css'
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activationSlice";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate )
  const dispatch = useDispatch() 
  const [fullname, setFullname] = useState(name)

  function nextStep() {
    if (!fullname) {
      return
    }
    dispatch(setName(fullname))
    onNext()
  }
  return (
    <>
      <Card title="What's your full name?" icon='goggle-emoji'>
          <TextInput 
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            />
          <p className={styles.paragraph}>
            People use real names at coderhouse :) !
          </p>
          <div>
            <div>
              <Button onClick={nextStep} text='Next'/>
            </div>
          </div>
      </Card>
    </>
  )
}

export default StepName