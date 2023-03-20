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
import { MAIN_ROUTE } from '../../../../const/route'
import { useNavigate } from 'react-router-dom'


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
  const navigate = useNavigate()
  const [signUp] = useSignUpMutation()
  const handleSubmit = async (data: ISignUpFormData) => {
    try {
      await signUp({
        login: data.login,
        email: data.email,
        first_name: data.firstName,
        second_name: data.lastName,
        password: data.password,
        phone: data.phone
      }).then((data: any) => {
        if (data.data.id) return navigate(MAIN_ROUTE)
      })
    } catch (e) {
      console.error(e)
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
