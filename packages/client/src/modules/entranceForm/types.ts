import { FormikState, FormikHandlers } from 'formik';

interface IInput {
  label: string,
  placeholder: string,
  inputName: string,
  type: string,
}

interface IFormData {
  title: string,
  linkText: string,
  route: string,
}

interface IEntranceForm<Values> {
  handleSubmit: FormikHandlers['handleSubmit'],
  handleChange: FormikHandlers['handleChange'],
  handleBlur: FormikHandlers['handleBlur'],
  values: Values,
  errors: FormikState<Values>['errors'],
  touched: FormikState<Values>['touched'],
}

export type TForm =
  IEntranceForm<{[key: string]: string}> & {
    inputsData: IInput[],
    formData: IFormData
  };
  
export type TInputsList = Omit<TForm, 'handleSubmit' | 'formData'>;
