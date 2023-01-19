import React from 'react';
import { FormControlProps } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import styles from './formInput.module.scss';

const {
  input,
  inputLabel,
  inputControl,
  inputFeedback,
} = styles;

interface IFormInputProps extends FormControlProps {
  label: string,
  inputName: string,
  placeholder: string,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error: string | undefined,
  touched: boolean | undefined,
}

const FormInput = ({ 
    label,
    type,
    inputName,
    placeholder,
    value,
    onChange,
    handleBlur,
    error,
    touched
  }: IFormInputProps) => {
  
  return (
    <Row className='mb-3'>
      <Form.Group controlId={`${inputName}ValidationFormik`} className={input}>
        <Form.Label className={inputLabel}>{label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            className={inputControl}
            type={type}
            placeholder={placeholder}
            name={inputName}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            isInvalid={!!(error && touched)}
          />
          <Form.Control.Feedback 
            type='invalid'
            className={inputFeedback}
          >
            {error}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    </Row>
  )
}

export default FormInput;
