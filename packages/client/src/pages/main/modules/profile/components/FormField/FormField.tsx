import React from 'react'
import styles from './formField.module.scss'
import { Field } from 'formik'

interface IFieldValues {
  id: string;
  title: string;
  type: string;
  name: string;
  value: string;
  error: string | undefined;
}

const FormField: React.FC<IFieldValues> = ({ id, title, type, name, value, error }) => {
  return(
    <div className={styles.formControl}>
      <label htmlFor={name}>{title}</label>
      <Field name={name} id={id} type={type} value={value}/>
      {error ? <div className={styles.formError}>{error}</div> : null}
    </div>
  )
}

export default FormField
