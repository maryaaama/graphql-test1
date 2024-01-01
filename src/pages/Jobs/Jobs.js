
import React,{useState, useCallback}  from 'react';

import { useFormik, Field, Form, Formik } from 'formik'; // Include ErrorMessage
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import JobList from './JobList';
import './Jobs.css';
import { useMutation, gql } from '@apollo/client';
import MultiAutocompleteExample from './SelectSkills'
const CREATE_JOBS = gql`
  mutation CreateJobs($title: String!, $description: String!, $city: String!, $skills: [String]!) {
    createJobs(input: { title: $title, description: $description, city: $city, skills: $skills }) {
      job {
        title
        description
        city
        skills {
          title
          id
        }
      }
      status
      message
    }
  }
`;

const validationSchema = yup.object({
  title: yup.string('Enter your title').required('Title is required'),
  description: yup.string('Enter your description').required('Description is required'),
  city: yup.string('Enter your city').required('City is required'),
});

const cities = ['tehran', 'ahvaz', 'mashhad', 'tabriz', 'shiraz', 'esfahan'];

export default function Jobs() {
  const [createJob, { loading, error }] = useMutation(CREATE_JOBS);
  const [jobList, setJobList] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      city: null,
      skills: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setJobList(values);
      try {
        const result = await createJob({
          variables: {
            title: values.title,
            description: values.description,
            city: values.city,
            skills: values.skills,
          },
        });
      } catch (error) {
        console.error('Error creating job:', error.message);
      }
    },
  });

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  return (
    <>
      <div className="container">
        <Formik onSubmit={formik.handleSubmit} initialValues={formik.initialValues}>
          <Form className="text">
            <div className="title">
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
            <div className="description">
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
            <div className="city">
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
            <div>
            <Field
              name="skills"
              component={({ field, form }) => (
             <MultiAutocompleteExample label="Skills" name="skills" {...field} form={form} />
            )}
            />

            </div>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Form>
        </Formik>
      </div>
      <div>
        <JobList></JobList>
      </div>
    </>
  );
}
