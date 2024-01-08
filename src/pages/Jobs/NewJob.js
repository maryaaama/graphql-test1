import React, { useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Formik,Field, Form } from "formik";
import { Card, Button, FormLayout ,ContextualSaveBar,Frame} from "@shopify/polaris";
import {TextField,Select} from "@satel/formik-polaris";
import * as yup from 'yup';
import './NewJob.css';
import { useMutation, gql } from '@apollo/client';
import Skills from "./Skills";
import JobList from './JobList';
const CREATE_JOB = gql`
  mutation CreateJob($title: String!, $description: String!, $city: String!, $skills: [String]!) {
    createJob(input: { title: $title, description: $description, city: $city, skills: $skills }) {
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

const OPTIONS = [
  { label: "tehran", value: "tehran" },
  { label: "ahvaz", value: "ahvaz" },
  { label: "shiraz", value: 'shiraz' },
  { label: "esfahan", value: 'esfahan' },
  { label: "mashhad", value: 'mashhad' },
  { label: "tabriz", value: 'tabriz' },
  { label: "zanjan", value: 'zanjan' },
  { label: "boshehr", value: 'boshehr' },
];


const validationSchema = yup.object({
  title: yup.string('Enter your title').required('Title is required'),
  description: yup.string('Enter your description').required('description is required'),
  city: yup.string('Enter your city').required('City is required'),
  skills: yup.array().min(1).required("required !"),
});


const initialValues= {
  title: '',
  description:'',
  city:'',
  skills:[],
 
}
 export default function NewJob() {
  const [createJob, { error }] = useMutation(CREATE_JOB);
  const navigate = useNavigate();
  const handleSubmit =  useCallback(
    
    async (values) => {
      console.log(values);
      try {
        const { data } = await createJob({
          variables: {
            title: values.title,
            description: values.description,
            city: values.city,
            skills: values.skills,
          },
        });
        if (data.createJob.status) {
         console.log('yas');
        }
      } catch {
        console.log(error);
      }
    },
    [createJob, error],
  );
  return (
    <div className="contain">
      <Frame>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, dirty ,submitForm, isSubmitting}) => (
        <>
          <Form>
          <ContextualSaveBar
               discardAction={{
                onAction: () => {
                console.log('yes');
                  },
                   }}
                 saveAction={{
                 loading: isSubmitting,
                 disabled: !dirty,
                 onAction: submitForm,
                   }}
               />

            <Card sectioned>
              <FormLayout>
                <TextField label="Title" name="title" />
                <TextField label="Description" name="description"  multiline={4}/>
                  <Select label="city" name="city" options={OPTIONS} />
                  <div className="skills">
                  <Skills  label="Skills" name="skills" />
                   </div>
                {/*<Button submit primary disabled={!dirty}> Save </Button>*/}
              </FormLayout>
            </Card>
          </Form>
          <br />
          <Card subdued sectioned title="Internal Form Values">
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Card>
        </>
      )}
    </Formik>
    </Frame>
    </div>
  );
}

