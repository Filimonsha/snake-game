import { Formik } from 'formik'
import { EntranceForm } from '../../../../modules/entranceForm'
import {
  INPUTS_DATA,
  FORM_DATA,
  INITIAL_VALUES,
  VALIDATION_SCHEMA
} from './data'
import { useSignInMutation } from '../../../../store/api/yadnex/auth/authApi'
import { UserShortInfo } from '../../../../utils/const/api/auth'


const FormSignIn = () => {
  const [signIn] = useSignInMutation()
  const handleSubmit = (data: UserShortInfo) => {
    signIn(data)
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
            values={values}
            errors={errors}
            touched={touched}
            inputsData={INPUTS_DATA}
            formData={FORM_DATA}
          />
        )
      }
    </Formik>
  )
}

export default FormSignIn
