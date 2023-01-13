import { Formik } from 'formik';
import { EntranceForm } from '../../../../modules/entranceForm';
import { 
  INPUTS_DATA,
  FORM_DATA,
  INITIAL_VALUES,
  VALIDATION_SCHEMA
} from './data';


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
  
  const handleSubmit = (data: ISignUpFormData) => {
    delete data.passwordRepeat;
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
  );
}

export default FormSignUp;
