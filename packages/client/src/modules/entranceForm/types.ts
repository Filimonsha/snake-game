import { FormikState, FormikHandlers } from 'formik';

interface IInput {
  label: string,
  placeholder: string,
  inputName: string,
  type: string,
}

interface IFormData {
  title: string,
  buttonText: string,
  linkText: string,
  route: string,
}

interface IEntranceForm<Values> {
  handleSubmit: FormikHandlers['handleSubmit'],
  handleChange: FormikHandlers['handleChange'],
  handleBlur: FormikHandlers['handleBlur'],
  handleOauth?: any, 
  values: Values,
  errors: FormikState<Values>['errors'],
  touched: FormikState<Values>['touched'],
}

export type TForm =
  IEntranceForm<{[key: string]: string}> & {
    inputsData: IInput[],
    formData: IFormData,
    formType?: string
  };
  
export type TInputsList = Omit<TForm, 'handleSubmit' | 'formData'>;
