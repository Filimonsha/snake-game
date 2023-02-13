import React, { useEffect, useState } from 'react'
import styles from './profile.module.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Formik, Form } from 'formik'
import { AvatarModal } from './components/AvatarModal'
import { FormField } from './components/FormField'
import { validationSchema } from './validation'
import { DEFAULT_USER_DATA } from './constants'
import { useGetUserInfoQuery } from '../../../../store/api/yadnex/auth/authApi'
import { UserFullInfo } from '../../../../types/auth'

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserFullInfo>(DEFAULT_USER_DATA)
  const [isAvatarShown, setIsAvatarShown] = useState<boolean>(false);
  const { data } = useGetUserInfoQuery()
  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [])


  const handleSubmit = (data: UserFullInfo) => {
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
    <div className={styles.profile}>
      <div className={styles.profileCircle}>
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
                  <Button className={styles.buttonSave} type='submit'>
                    Save
                  </Button>
                  <Button className={styles.buttonCancel} variant='secondary' onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>

          <AvatarModal isShown={isAvatarShown} handleClose={handleAvatarClose} handleSave={handleAvatarSave} handleDelete={handleAvatarDelete} />
        </Container>
      </div>
    </div>
  )
}

export default Profile
