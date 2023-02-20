import { Formik } from 'formik'
import { EntranceForm } from '../../../../modules/entranceForm'
import {
  INPUTS_DATA,
  FORM_DATA,
  INITIAL_VALUES,
  VALIDATION_SCHEMA,
  FORM_TYPE
} from './data'
import { useSignUpMutation } from '../../../../store/api/yadnex/auth/authApi'


interface ISignUpFormData {
  login: string,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  passwordRepeat?: string,
}

const FormSignUp = () => {
  const [signUp] = useSignUpMutation()
  const handleSubmit = (data: ISignUpFormData) => {
    signUp({
      login: data.login,
      email: data.email,
      first_name: data.firstName,
      second_name: data.lastName,
      password: data.password,
      phone: data.phone
    })
    delete data.passwordRepeat
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
            formType={FORM_TYPE}
          />
        )
      }
    </Formik>
  )
}

export default FormSignUp
