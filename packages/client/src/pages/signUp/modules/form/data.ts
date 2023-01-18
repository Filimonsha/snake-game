import { SIGN_IN_ROUTE } from '../../../../utils/const/route';
import { Pattern, Feedback } from '../../../../utils/const/validation';
import * as yup from 'yup';

export const INPUTS_DATA = [
  {
    label: 'Username',
    placeholder: 'Your username',
    inputName: 'login',
    type: 'text',
  },
  {
    label: 'First name',
    placeholder: 'Your first name',
    inputName: 'first_name',
    type: 'text',
  },
  {
    label: 'Last name',
    placeholder: 'Your last name',
    inputName: 'last_name',
    type: 'text',
  },
  {
    label: 'Email',
    placeholder: 'Your email',
    inputName: 'email',
    type: 'email',
  },
  {
    label: 'Phone',
    placeholder: 'Your phone number',
    inputName: 'phone',
    type: 'tel',
  },
  {
    label: 'Password',
    placeholder: '∙∙∙∙∙∙∙∙',
    inputName: 'password',
    type: 'password',
  },
  {
    label: 'Confirm password',
    placeholder: '∙∙∙∙∙∙∙∙',
    inputName: 'passwordRepeat',
    type: 'password',
  },
];

export const INITIAL_VALUES = {
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
}

export const FORM_DATA = {
  title: 'Sign Up',
  buttonText: 'Sign Up',
  linkText: 'Already have an account?',
  route: SIGN_IN_ROUTE,
}

export const VALIDATION_SCHEMA = yup.object().shape({
  login: yup.string()
            .matches(Pattern.Login, Feedback.Username)
            .required('Enter your username'),
  firstName: yup.string()
            .matches(Pattern.Name, Feedback.Name)
            .required('Enter your first name'),
  lastName: yup.string()
            .matches(Pattern.Name, Feedback.Name)
            .required('Enter your last name'),
  email: yup.string()
            .matches(Pattern.Email, Feedback.Email)
            .required('Enter your email'),
  phone: yup.string()
            .matches(Pattern.Phone, Feedback.Phone)
            .required('Enter your phone'),
  password: yup.string()
            .matches(Pattern.Password, Feedback.Password)
            .required('Enter your password'),
  passwordRepeat: yup.string()
            .oneOf([yup.ref('password')], Feedback.PasswordRepeat)
            .required('Confirm your password'),
});
