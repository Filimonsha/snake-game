import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import dummyData from './dummy.json'
import { AvatarModal } from './components/AvatarModal'
import { FormField } from './components/FormField'

interface IFormValues {
  avatar: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<IFormValues>({
    avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: ''
  })
  const [isAvatarShown, setIsAvatarShown] = useState<boolean>(false);

  const firstNameRule = /^[a-zA-Z ]{2,30}$/;
  const secondNameRule = /^[a-zA-Z ]{2,30}$/;
  const loginRule = /^[a-zA-Z0-9_-]{3,20}$/;
  const phoneRule = /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/;
  const passwordRule = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/;
  
  const validationSchema = () => {
    return Yup.object().shape({
      first_name: Yup.string()
                  .matches(firstNameRule, 'Invalid name')
                  .required('Required'),
      second_name: Yup.string()
                  .matches(secondNameRule, 'Invalid surname')
                  .required('Required'),
      login: Yup.string()
                  .matches(loginRule, '3 to 20 symbols and no space')
                  .required('Required'),
      email: Yup.string()
                  .email('Invalid email')
                  .required('Required'),
      phone: Yup.string()
                  .matches(phoneRule, 'Invalid phone number')
                  .required('Required'),
      password: Yup.string()
                  .matches(passwordRule, '8 to 40 symbols, at least 1 number, at least one capital letter')
                  .required('Required'),
    });
  }

  useEffect(() => {
    setUser(dummyData[0]);
  }, [user])
  

  const handleSubmit = (data: IFormValues) => {
    console.log('submit', data)
  }

  const handleCancel = () => {
    console.log('cancel change')
  }

  const handleAvatarChange = () => {
    console.log('avatar change')
    setIsAvatarShown(true)
  }

  const handleAvatarClose = () => {
    console.log('cancel change avatar');
    setIsAvatarShown(false);
  }

  const handleAvatarSave = () => {
    console.log('save avatar');
    setIsAvatarShown(false);
  }

  const handleAvatarDelete = () => {
    console.log('delete avatar');
  }

  return (
    <Container className={styles.container}>
      <Formik
        enableReinitialize={true}
        initialValues={user}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, values }) => (
          <Form className={styles.form}> 
            <div className={styles.formAvatar} onClick={handleAvatarChange}>
              <img src={values.avatar || user.avatar} alt='avatar' className={styles.avatarImg}></img>
            </div>
            <div className={styles.formBody}>
              <FormField 
                id='first_name'
                title='Name'
                type='text'
                name='first_name'
                value={values.first_name}
                error={errors.first_name}
              />
              <FormField 
                id='second_name'
                title='Second name'
                type='text'
                name='second_name'
                value={values.second_name}
                error={errors.second_name}
              />
              <FormField 
                id='login'
                title='Nickname'
                type='text'
                name='login'
                value={values.login}
                error={errors.login}
              />
              <FormField 
                id='email'
                title='Email'
                type='email'
                name='email'
                value={values.email}
                error={errors.email}
              />
              <FormField 
                id='phone'
                title='Phone'
                type='phone'
                name='phone'
                value={values.phone}
                error={errors.phone}
              />
              <FormField 
                id='password'
                title='Password'
                type='password'
                name='password'
                value={values.password}
                error={errors.password}
              />
            </div>
            <div className={styles.formFooter}>
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

      <AvatarModal isShown={isAvatarShown} handleClose={handleAvatarClose} handleSave={handleAvatarSave} handleDelete={handleAvatarDelete} />
    </Container>
  )
}

export default Profile
