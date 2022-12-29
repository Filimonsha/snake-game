import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import dummyData from './dummy.json'
import { AvatarModal } from './components/AvatarModal'

interface FormTypes {
  avatar: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

const Profile: React.FC = () => {
  const initialValues: FormTypes = {
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
  };
  
  const validationSchema = () => {
    return Yup.object().shape({
      first_name: Yup.string()
                  .matches(/^[a-zA-Z ]{2,30}$/, 'Invalid name')
                  .required('Required'),
      second_name: Yup.string()
                  .matches(/^[a-zA-Z ]{2,30}$/, 'Invalid surname')
                  .required('Required'),
      login: Yup.string()
                  .matches(/^[a-zA-Z0-9_-]{3,20}$/, '3 to 20 symbols and no space')
                  .required('Required'),
      email: Yup.string()
                  .email('Invalid email')
                  .required('Required'),
      phone: Yup.string()
                  .matches(/^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/, 'Invalid phone number')
                  .required('Required'),
      password: Yup.string()
                  .matches(/^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/, '8 to 40 symbols, at least 1 number, at least one capital letter')
                  .required('Required'),
    });
  }
  const [user, setUser] = useState<FormTypes>(initialValues)
  const [showAvatar, setShowAvatar] = useState<boolean>(false);

  useEffect(() => {
    setUser(dummyData[0]);
  }, [user])
  

  const handleSubmit = (data: FormTypes) => {
    console.log('submit', data)
  }

  const handleCancel = () => {
    console.log('cancel change')
  }

  const handleAvatarChange = () => {
    console.log('avatar change')
    setShowAvatar(true)
  }

  const handleAvatarClose = () => {
    console.log('cancel change avatar');
    setShowAvatar(false);
  }

  const handleAvatarSave = () => {
    console.log('save avatar');
    setShowAvatar(false);
  }

  const handleAvatarDelete = () => {
    console.log('delete avatar');
  }

  return (
    <Container className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <Form className={styles.form}> 
            <div className={styles.form__avatar} onClick={handleAvatarChange}>
              <img src={user.avatar || initialValues.avatar} alt='avatar' className={styles.avatar__img}></img>
            </div>
            <div className={styles.form__body}>
              <div className={styles.form__control}>
                <label htmlFor='first_name'>Name</label>
                <Field name='first_name' type='text' value={user.first_name}/>
                {errors.first_name ? <div className={styles.form__error}>{errors.first_name}</div> : null}
              </div>
              <div className={styles.form__control}>
                <label htmlFor='second_name'>Second name</label>
                <Field name='second_name' type='text' value={user.second_name}/>
                {errors.second_name ? <div className={styles.form__error}>{errors.second_name}</div> : null}
              </div>
              <div className={styles.form__control}>
                <label htmlFor='login'>Nickname</label>
                <Field name='login' type='text' value={user.login}/>
                {errors.login ? <div className={styles.form__error}>{errors.login}</div> : null}
              </div>
              <div className={styles.form__control}>
                <label htmlFor='email'>Email</label>
                <Field name='email' type='email' value={user.email}/>
                {errors.email ? <div className={styles.form__error}>{errors.email}</div> : null}
              </div>
              <div className={styles.form__control}>
                <label htmlFor='phone'>Phone</label>
                <Field name='phone' type='phone' value={user.phone}/>
                {errors.phone ? <div className={styles.form__error}>{errors.phone}</div> : null}
              </div>
              <div className={styles.form__control}>
                <label htmlFor='password'>Password</label>
                <Field name='password' type='password' value={user.password}/>
                {errors.password ? <div className={styles.form__error}>{errors.password}</div> : null}
              </div>
            </div>
            <div className={styles.form__footer}>
              <Button className={styles.button} type='submit'>
                Save
              </Button>
              <Button className={styles.button} variant='secondary' onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <AvatarModal show={showAvatar} handleClose={handleAvatarClose} handleSave={handleAvatarSave} handleDelete={handleAvatarDelete} />
    </Container>
  )
}

export default Profile
