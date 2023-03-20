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
import { UserProfileInfo } from '../../../../types/auth'
import PasswordForm from './modules/PasswordForm'
import { RESOURCES_HOST } from '../../../../const/host'
import { useChangeProfileMutation } from '../../../../store/api/yadnex/profile/profileApi'
import { toast } from 'react-toastify'
import defaultAvatar from '../../../../assets/img/default-avatar.png';
import { withErrorBoundary } from '../../../../modules/errorBoundary/withErrorBoundary'

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserProfileInfo>(DEFAULT_USER_DATA)
  const [isAvatarShown, setIsAvatarShown] = useState<boolean>(false);
  const {data} = useGetUserInfoQuery()

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [user, data])
  
  const [changeProfile] = useChangeProfileMutation();

  const handleSubmit = async (userData: UserProfileInfo) => {
    try {
      const res = await changeProfile(userData);
      if ('data' in res) {
        toast.success('Profile has been updated');
      } else {
        throw new Error('Cannot update profile');
      }
    } catch {
      toast.error('Cannot update profile');
    }
  };

  const handleAvatarChange = () => {
    setIsAvatarShown(true)
  }

  const handleAvatarClose = () => {
    setIsAvatarShown(false);
  }

  return (
    <div className={styles.profile}>
      <div className={styles.profileCircle}>
        <div className={styles.wrapper}>
          <Container className={styles.container}>
            <Formik
              enableReinitialize={true}
              initialValues={user}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, values }) => {
                
                const avatarPath = values.avatar !== null ?
                  RESOURCES_HOST + values.avatar
                  : defaultAvatar
                
                 return <Form className={styles.form}> 
                  <div className={styles.formAvatar} onClick={handleAvatarChange}>
                    <img 
                      src={avatarPath}
                      className={styles.avatarImg}
                      alt='avatar'
                      crossOrigin='anonymous' 
                    />
                  </div>
                  <div className={styles.formBody}>
                    <h3 className={styles.title}>Your profile</h3>
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
                      title='Login'
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
                  </div>
                  <div className={styles.formFooter}>
                    <Button 
                      className={styles.buttonCancel} 
                      variant='secondary'
                      type='reset'
                    >
                      Reset
                    </Button>
                    <Button className={styles.buttonSave} type='submit'>
                      Update
                    </Button>
                  </div>
                </Form>
              }}
            </Formik>

            <AvatarModal 
              isShown={isAvatarShown} 
              handleClose={handleAvatarClose} />
          </Container>
          <PasswordForm />
        </div>
      </div>
    </div>
)}

export default withErrorBoundary(Profile);
