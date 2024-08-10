import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Name is required'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  
  number: Yup.string()
    .matches(/^[0-9]+$/, "Must be a valid number")
    .min(10, 'Number must be at least 10 digits')
    .max(10, 'Number cannot exceed 10 digits')
    .required('Number is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export default validationSchema;
