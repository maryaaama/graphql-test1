import React,{ useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import JobList from './JobList';
import './Jobs.css';

const validationSchema = yup.object({
  title: yup
    .string('Enter your title')
    .required('title is required'),
    description: yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
    city:yup
    .string('Enter your password')
    .min(4, 'Password should be of minimum 4 characters length')
    .required('Password is required'),
   
});
const cities = ['tehran','ahvaz','mashhad','tabriz','shiraz','esfahan'];
const top15skils = ['frontend', 'python', 'C++',  'Nodejs',  'backend', "javascript"];


export default function Jobs() {
  const [todo,setTodo]=useState({});
  const [jobList,setJobList]=useState([]);
  
    const formik = useFormik({
      initialValues: {
        title: '',
        description: '',
        city:null,
        skils:[],
      },
      validationSchema: validationSchema,
     
      onSubmit: (values) => {
        console.log(values);
        setTodo(values);
        
      },
    });
    return (
      <>
      <div className='container'>
        <form onSubmit={formik.handleSubmit} className='text'>
          <div className='title'>
          <TextField
            fullWidth
            id="title"
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          </div>
          <div className='description'>
          <TextField
            fullWidth
            id="description"
            name="description"
            label="Description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
          </div>
          <div className='city'>
          <Autocomplete
          id="city"
          options={cities}
          getOptionLabel={(option) => option}
          value={formik.values.city}
          onChange={(e, value) => formik.setFieldValue('city', value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="City"
              error={formik.touched.city && Boolean(formik.errors.city)}
              helperText={formik.touched.city && formik.errors.city}
            />
          )}
        />
          </div>
          <div className='skils'>
          <Autocomplete
          multiple
          id="skils"
          options={top15skils}
          getOptionLabel={(option) => option}
          value={formik.values.skils}
          onChange={(e, value) => formik.setFieldValue('skils', value)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Skils"
              error={formik.touched.skils && Boolean(formik.errors.skils)}
              helperText={formik.touched.skils && formik.errors.skils}
            />
          )}
        />
  
          </div>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </form>

      </div>
      <div>
      <JobList></JobList>
      </div>
      </>
    )
 
}


 