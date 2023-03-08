import { useNavigate } from 'react-router-dom'
import { Formik } from 'formik'
import { EntranceForm } from '../../../../modules/entranceForm'
import {
  INPUTS_DATA,
  FORM_DATA,
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
  FORM_TYPE
} from './data'
import { useSignInMutation } from '../../../../store/api/yadnex/auth/authApi'
import { UserShortInfo } from '../../../../types/auth'
import { onOauth } from '../../../../store/api/yadnex/auth/Oauth'

const FormSignIn = () => {
  const [signIn] = useSignInMutation()
  const navigate = useNavigate()

  const handleSubmit = async (data: UserShortInfo) => {
    try {
      const result = await signIn(data)
      console.log('RESULT', result)

      // return navigate('/game')
    } catch (e) {
      console.log(e)
    }
  }

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
          <EntranceForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleOauth={onOauth}
            values={values}
            errors={errors}
            touched={touched}
            inputsData={INPUTS_DATA}
            formData={FORM_DATA}
            formType={FORM_TYPE}
          />
        )
      }
    </Formik>
  )
}

export default FormSignIn
