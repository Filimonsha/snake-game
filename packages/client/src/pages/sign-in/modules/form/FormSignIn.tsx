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
  form__title,
  form__submit,
  form__link
} = styles;

type LoginFormData = {
  login: string,
  password: string,
}

const schema = yup.object().shape({
  login: yup.string()
            .matches(Pattern.Login, 'Неверный формат логина')
            .required('Укажите логин'),
  password: yup.string()
            .matches(Pattern.Password, 'Неверный формат пароля')
            .required('Укажите пароль'),
});

const FormSignIn = () => {
  
  const handleSubmit = (data: LoginFormData) => {
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
          <h2 className={form__title}>Войти</h2>
            <FormInput
              label='Логин'
              placeholder='Ваш логин в игре'
              inputName='login'
              type='text'
              value={values.login}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.login}
              touched={touched.login}
            />
            <FormInput
              label='Пароль'
              placeholder='∙∙∙∙∙∙∙∙'
              inputName='password'
              type='password'
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
            />
            <Row className='pt-3'>
              <Stack direction='horizontal' gap={3}>
                <Button type='submit' className={form__submit}>
                  Войти
                </Button>
                <Link 
                  to={SIGN_UP_ROUTE} 
                  className={`ms-auto ${form__link}`}
                >
                  Нет аккаунта?
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