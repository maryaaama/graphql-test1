
import React, { useState , useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './LogIn.css';
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    password: yup.string('Enter your password').min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
    
  });


export default function LogIn() {
    const navigate = useNavigate();
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

     const formik = useFormik({
        initialValues: {
          email: 'maryam@example.com',
          password: 'maryam',   
        },

        validationSchema: validationSchema,

        onSubmit: async (values) => {
          try {
            const { data } = await loginUser({
              mutation: LOGIN_USER,
              variables: {
                email: values.email,
                password: values.password,
              },
            });
            console.log('Token:', data.login.token);
            if (data.login.token !== null) {
              navigate('/Users', { token: data.login.token });
            } else {
              alert('ایمیل و پسورد را درست وارد کنید');
              console.log('error');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        
          console.log('values: ', values);
          localStorage.setItem('email',values.email);
          localStorage.setItem('password',values.password);
          /*
            if (values.email === email_store && values.password === password_store) {
              console.log(data.user.email);
            }
          */
        },
        });
        if (loading) return null;
        if (error) return `Error! ${error}`;
        
      
  return (
    <div className='form1'>
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
         
          <div className='button1'>
            <Button color="primary" variant="contained" fullWidth type="submit">
             LogIn
            </Button>
          </div>
        </form>
      </Box>
    </Container>
  </div>
  )
}
