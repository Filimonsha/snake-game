import * as yup from 'yup';
import { SIGN_UP_ROUTE } from '../../../../const/route';
import { Pattern } from '../../../../const/validation';

export const INPUTS_DATA = [
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

export const INITIAL_VALUES = {
  login: '',
  password: '',
}

export const FORM_DATA = {
  title: 'Log In',
  buttonText: 'Log In',
  linkText: 'Register',
  route: SIGN_UP_ROUTE,
}

export const VALIDATION_SCHEMA = yup.object().shape({
  login: yup.string()
            .matches(Pattern.Login, 'Wrong username format')
            .required('Enter your username'),
  password: yup.string()
            .matches(Pattern.Password, 'Wrong password format')
            .required('Enter your password'),
});
