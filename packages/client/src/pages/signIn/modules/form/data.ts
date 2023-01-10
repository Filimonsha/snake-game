import { SIGN_UP_ROUTE } from '../../../../utils/const/route';

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
  linkText: 'Register',
  route: SIGN_UP_ROUTE,
}
