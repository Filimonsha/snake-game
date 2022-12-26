import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

type formInputProps = {
  label: string,
  type: string,
  inputName: string,
  placeholder: string,
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
    handleChange,
    handleBlur,
    error,
    touched
  }: formInputProps) => {
  
  return (
    <Row className='mb-3'>
      <Form.Group controlId={`${inputName}ValidationFormik`}>
        <Form.Label>{label}</Form.Label>
        <InputGroup hasValidation>
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={inputName}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!(error && touched)}
          />
          <Form.Control.Feedback type='invalid'>
            {error}
          </Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    </Row>
  )
}

export default FormInput;