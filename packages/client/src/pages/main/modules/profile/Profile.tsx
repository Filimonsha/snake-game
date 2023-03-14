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
import { useNavigate } from 'react-router-dom'
import { GAME_ROUTE } from '../../../../const/route'

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserFullInfo>(DEFAULT_USER_DATA)
  const [isAvatarShown, setIsAvatarShown] = useState<boolean>(false);
  const {data} = useGetUserInfoQuery()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [user, data])

  const handleSubmit = (data: UserFullInfo) => {
    console.log('submit', data)
  }

  const handleCancel = () => {
    return navigate(GAME_ROUTE)
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
                  {/* Полный роут для аватара 
                      RESOURCES_URL/values.avatar 
                      RESOURCES_URL = BASE_SERVER_URL + 'resources/'
                      http://localhost:3001/resources/av-278fedc8-9668-4717-b3f1-ceb677be5655-1.png
                  */}
                  <img src={values.avatar || DEFAULT_USER_DATA.avatar} alt='avatar' className={styles.avatarImg}></img>
                </div>
                <div className={styles.formBody}>
                  <FormField 
                    id='first_name'
                    title='Name'
                    type='text'
                    name='first_name'
                    value={values.first_name || DEFAULT_USER_DATA.first_name}
                    error={errors.first_name}
                  />
                  <FormField 
                    id='second_name'
                    title='Second name'
                    type='text'
                    name='second_name'
                    value={values.second_name || DEFAULT_USER_DATA.second_name}
                    error={errors.second_name}
                  />
                  <FormField 
                    id='login'
                    title='Nickname'
                    type='text'
                    name='login'
                    value={values.login || DEFAULT_USER_DATA.login}
                    error={errors.login}
                  />
                  <FormField 
                    id='email'
                    title='Email'
                    type='email'
                    name='email'
                    value={values.email || DEFAULT_USER_DATA.email}
                    error={errors.email}
                  />
                  <FormField 
                    id='phone'
                    title='Phone'
                    type='phone'
                    name='phone'
                    value={values.phone || DEFAULT_USER_DATA.phone}
                    error={errors.phone}
                  />
                  <FormField 
                    id='password'
                    title='Password'
                    type='password'
                    name='password'
                    value={values.password || DEFAULT_USER_DATA.password}
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
