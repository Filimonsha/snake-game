import * as yup from 'yup';
import { Formik } from 'formik';
import { Pattern } from '../../../../utils/const/validation';
import { EntranceForm } from '../../../../modules/entranceForm';
import { inputsData, formData, initialValues } from './data';


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
      initialValues={initialValues}
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
            inputsData={inputsData}
            formData={formData}
          />
        )
      }
    </Formik>
  );
}

export default FormSignIn;
