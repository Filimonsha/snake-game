import { Formik } from 'formik'
import { EntranceForm } from '../../../../modules/entranceForm'
import {
  INPUTS_DATA,
  FORM_DATA,
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
  FORM_TYPE
} from './data'
import { useGetUserInfoQuery, useLogoutMutation, useSignInMutation } from '../../../../store/api/yadnex/auth/authApi'
import { UserShortInfo } from '../../../../types/auth'
import { Alert } from 'react-bootstrap'
import { useEffect } from 'react'
import { useGetThemeMutation } from '../../../../store/api/backend/theme/themeApi'
import { onOauth } from '../../../../store/api/yadnex/auth/Oauth'


const FormSignIn = () => {
  const [signIn, { isError, isSuccess }] = useSignInMutation()
  const [getTheme] = useGetThemeMutation()
  const [logout] = useLogoutMutation()
  const {data:userData} = useGetUserInfoQuery(undefined,{skip:!isSuccess})
  const handleSubmit = (data: UserShortInfo) => {
    logout()
    signIn(data)
  }

  useEffect(() => {
    if (userData) {
      getTheme({userId:userData.id})
    }
  },[userData])
  return (
    <Formik
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
    >
      {
        ({
           handleSubmit,
           handleChange,
           handleBlur,
           values,
           errors,
           touched
         }) => (
          <>
            <EntranceForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleBlur={handleBlur}
              values={values}
              errors={errors}
              touched={touched}
              inputsData={INPUTS_DATA}
              formData={FORM_DATA}
            />
            {
              isError && <Alert variant='danger'>
                Неверный логин или пароль
              </Alert>
            }
          </>
        )
      }
    </Formik>
  )
}

export default FormSignIn
