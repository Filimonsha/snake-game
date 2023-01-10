import * as yup from 'yup';
import { Formik } from 'formik';
import { Pattern } from '../../../../utils/const/validation';
import { EntranceForm } from '../../../../modules/entranceForm';
import { INPUTS_DATA, FORM_DATA, INITIAL_VALUES } from './data';


interface ILoginFormData {
  login: string,
  password: string,
}

const schema = yup.object().shape({
  login: yup.string()
            .matches(Pattern.Login, 'Wrong username format')
            .required('Enter your username'),
  password: yup.string()
            .matches(Pattern.Password, 'Wrong password format')
            .required('Enter your password'),
});

const FormSignIn = () => {
  
  const handleSubmit = (data: ILoginFormData) => {
    alert(JSON.stringify(data));
  }
  
  return (
    <Formik
      validationSchema={schema}
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

export default FormSignIn;
