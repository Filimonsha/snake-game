import React from 'react'
import styles from '../profile.module.scss'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Formik, Form, FormikHelpers } from 'formik'
import { FormField } from '../components/FormField'
import { validationSchemaPassword } from '../validation'
import { DEFAULT_USER_DATA } from '../constants'
import { useChangePasswordMutation } from '../../../../../store/api/yadnex/profile/profileApi'
import { toast } from 'react-toastify'

interface IPassword {
  old_password: string,
  new_password: string,
}

const INITIAL_VALUES = {
  old_password: '',
  new_password: '',
}

const PasswordForm: React.FC = () => {
  
  const [changePassword] = useChangePasswordMutation()
  
  const handleSubmit = async (passwordData: IPassword, { resetForm }: FormikHelpers<IPassword>) => {
    try {
      const res = await changePassword(passwordData);
      if ('data' in res) {
        toast.success('Password has been updated');
        resetForm()
      } else {
        throw new Error('Cannot update password');
      }
    } catch(error) {
      toast.error(`${error}`);
    }
  };

  return (
        <Container className={styles.container}>
          <Formik
            enableReinitialize={true}
            initialValues={INITIAL_VALUES}
            validationSchema={validationSchemaPassword}
            onSubmit={handleSubmit}
            >
            {({ errors, values }) => (
              <Form className={styles.form}> 
                <h3 className={styles.title}>Your password</h3>
                <div className={styles.formBody}>

                  <FormField 
                    id='old_password'
                    title='Old password'
                    type='password'
                    name='old_password'
                    value={values.old_password || DEFAULT_USER_DATA.password}
                    error={errors.old_password}
                  />
                  <FormField 
                    id='new_password'
                    title='New password'
                    type='password'
                    name='new_password'
                    value={values.new_password || DEFAULT_USER_DATA.password}
                    error={errors.new_password}
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
            )}
          </Formik>
        </Container>
  )
}

export default PasswordForm
