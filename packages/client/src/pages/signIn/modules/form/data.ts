import { SIGN_UP_ROUTE } from '../../../../utils/const/route';

export const inputsData = [
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

export const initialValues = {
  login: '',
  password: '',
}

export const formData = {
  title: 'Log In',
  linkText: 'Register',
  route: SIGN_UP_ROUTE,
}
