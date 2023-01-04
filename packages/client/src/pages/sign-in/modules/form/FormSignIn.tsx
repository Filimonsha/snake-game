import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import * as yup from 'yup';
import styles from './formSignIn.module.scss';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import { FormInput } from '../../../../components/form-input';
import { Pattern } from '../../../../utils/const/validation';
import { SIGN_UP_ROUTE } from '../../../../utils/const/route';

const {
  form,
  formTitle,
  formSubmit,
  formLink
} = styles;

const inputData = [
  {
    label: 'Username',
    placeholder: 'Your username',
    inputName: 'login',
    type: 'text',
  },
  {
    label: 'Password',
    placeholder: '∙∙∙∙∙∙∙∙',
    inputName: 'password',
    type: 'password',
  },
];

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
      initialValues={{
        login: '',
        password: '',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        errors,
        touched,
        handleBlur
      }) => (
        <>
          <Form 
            noValidate 
            onSubmit={handleSubmit}
            className={form}
          >
          <h2 className={formTitle}>Log In</h2>
          { 
            inputData.map(({ label, placeholder, inputName, type }) => {
              const value = values[inputName as keyof typeof values] || '';
              const error = errors[inputName as keyof typeof values] || undefined;
              const touchedInput = touched[inputName as keyof typeof values] || undefined;
              
              return <FormInput
                  key={inputName}
                  label={label}
                  placeholder={placeholder}
                  inputName={inputName}
                  type={type}
                  value={value}
                  error={error}
                  touched={touchedInput}
                  onChange={handleChange}
                  handleBlur={handleBlur}
                />
              })
            }
            <Row className='pt-3'>
              <Stack direction='horizontal' gap={3}>
                <Button type='submit' className={formSubmit}>
                  Log In
                </Button>
                <Link 
                  to={SIGN_UP_ROUTE} 
                  className={`ms-auto ${formLink}`}
                >
                  Register
                </Link>
              </Stack>
            </Row>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default FormSignIn;