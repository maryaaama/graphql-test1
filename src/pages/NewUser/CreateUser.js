import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      status
      message
    }
  }
`;

const validationSchema = yup.object({
  email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
  password: yup.string('Enter your password').min(4, 'Password should be of minimum 4 characters length').required('Password is required'),
  confirmpassword: yup.string('Enter your confirmpassword').min(4, 'confirmpassword should be of minimum 4 characters length').required('confirmpassword is required'),
});

export default function CreateUser() {
    const [createUserMutation] = useMutation(CREATE_USER);
  const [users, setUsers] = useState([]);

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

          // Call the GraphQL mutation

          const result = await createUserMutation({
            variables: {
              email: values.email,
              password: values.password,
             
            },
          }); 
         
        }  
        catch (error) {
            if (error.graphQLErrors) {
              console.error('GraphQL Errors:', error.graphQLErrors);
            }
            if (error.networkError) {
              console.error('Network Error:', error.networkError);
            }
          }

      } else {
        alert('Password and confirmpassword dos not match');
      }
    },
  });

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
