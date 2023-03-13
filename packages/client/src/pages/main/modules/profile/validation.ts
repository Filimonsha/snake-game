import * as yup from 'yup'

const firstNameRule = /^[а-яёА-ЯЁa-zA-Z]{2,30}$/;
const secondNameRule = /^[а-яёА-ЯЁa-zA-Z]{2,30}$/;
const loginRule = /^[a-zA-Z0-9_-]{3,20}$/;
const phoneRule = /^(\(\d{2,}\) ((\d{4}-\d{4})|(9\d{4}-\d{4})))|(\d{2})((9\d{8})|(\d{8}))$/;
const passwordRule = /^(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,40}$/;
  
export const validationSchema = 
  yup.object().shape({
    first_name: yup.string()
                .matches(firstNameRule, 'Invalid name')
                .required('Required'),
    second_name: yup.string()
                .matches(secondNameRule, 'Invalid surname')
                .required('Required'),
    login: yup.string()
                .matches(loginRule, '3 to 20 symbols and no space')
                .required('Required'),
    email: yup.string()
                .email('Invalid email')
                .required('Required'),
    phone: yup.string()
                .matches(phoneRule, 'Invalid phone number')
                .required('Required')
                .nullable(),
  });

export const validationSchemaPassword = yup.object().shape({
  old_password: yup.string()
            .matches(passwordRule, '8 to 40 characters, at least one capital letter and number')
            .required('Enter your password'),
  new_password: yup.string()
            .matches(passwordRule, '8 to 40 characters, at least one capital letter and number')
            .required('Enter your password'),
});
