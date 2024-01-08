import React, { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import LogIn from '../LogIn/LogIn';
import './CreatUser.css'
const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      message
      status
    }
  }
`;


const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
  confirmpassword: yup.string('Enter your confirmpassword').min(6, 'confirmpassword should be of minimum 4 characters length').required('confirmpassword is required'),
});

export default function CreateUser() {
  const [createUser, { loading, error  }] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // This code block will run whenever the user state is updated
    console.log(users);
  }, [users]); 

  const formik = useFormik({
    initialValues: {
      email: 'maryam@example.com',
      password: 'maryam',
      confirmpassword: 'maryam',
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      console.log(values);
    
      if (values.password === values.confirmpassword) {
        try {
          const { data } = await createUser({
            mutation: CREATE_USER,
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          console.log('message:', data.createUser.message);
          console.log('status:', data.createUser.status);
          navigate('/LogIn');
          //navigate(`/?email=${values.email}&password=${values.password}`);
        } catch (error) {
          console.error('error: ', error);
          alert('error: ' + error);
        }
        console.log(values);
      }
      else{
        alert('match password and confirmpassword');
      }
    },
    });
    

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <div className='form2'>
      <Container maxWidth="sm">
        <Box sx={{ height: '30vh' }}>
          <form onSubmit={formik.handleSubmit}>
            <div className='email'>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </div>
            <div className='text'>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </div>
            <div>
              <TextField
                fullWidth
                id="confirmpassword"
                name="confirmpassword"
                label="confirmpassword"
                type="password"
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmpassword && Boolean(formik.errors.confirmpassword)}
                helperText={formik.touched.confirmpassword && formik.errors.confirmpassword}
              />
            </div>
            <div className='button1'>
              <Button color="primary" variant="contained" fullWidth type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Container>
    </div>
  );
}
