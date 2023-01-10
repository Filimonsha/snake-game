import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import styles from './entranceForm.module.scss';
import { Link } from 'react-router-dom';
import { FormInput } from '../../components/formInput';
import { TForm, TInputsList } from './types';

const {
  form,
  formTitle,
  formSubmit,
  formLink
} = styles;

const InputsList: React.FC<TInputsList> = ({
  values,
  errors,
  touched,
  inputsData,
  handleChange,
  handleBlur
}) => (
  <>
   {
    inputsData.map(({ label, placeholder, inputName, type }) => {
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
  </>
);

const EntranceForm: React.FC<TForm> = ({
  handleSubmit,
  handleBlur,
  handleChange,
  values,
  errors,
  touched,
  inputsData,
  formData
}) => (
  <Form
    noValidate 
    onSubmit={handleSubmit}
    className={form}
  >
    
    <h2 className={formTitle}>
      {formData.title}
    </h2>
  
    <InputsList
      handleBlur={handleBlur}
      handleChange={handleChange}
      values={values}
      errors={errors}
      touched={touched}
      inputsData={inputsData}
    />
  
    <Row className='pt-3'>
      <Stack direction='horizontal' gap={3}>
        <Button type='submit' className={formSubmit}>
          Log In
        </Button>
        <Link 
          to={formData.route} 
          className={`ms-auto ${formLink}`}
        >
          {formData.linkText}
        </Link>
      </Stack>
    </Row>
    
  </Form>
);

export default EntranceForm;
