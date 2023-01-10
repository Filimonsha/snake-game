import * as Yup from 'yup'

const firstNameRule = /^[a-zA-Z ]{2,30}$/;
const secondNameRule = /^[a-zA-Z ]{2,30}$/;
const loginRule = /^[a-zA-Z0-9_-]{3,20}$/;
const phoneRule = /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/;
const passwordRule = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/;
  
export const validationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string()
                .matches(firstNameRule, 'Invalid name')
                .required('Required'),
    second_name: Yup.string()
                .matches(secondNameRule, 'Invalid surname')
                .required('Required'),
    login: Yup.string()
                .matches(loginRule, '3 to 20 symbols and no space')
                .required('Required'),
    email: Yup.string()
                .email('Invalid email')
                .required('Required'),
    phone: Yup.string()
                .matches(phoneRule, 'Invalid phone number')
                .required('Required'),
    password: Yup.string()
                .matches(passwordRule, '8 to 40 symbols, at least 1 number, at least one capital letter')
                .required('Required'),
  });
}
