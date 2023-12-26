import React from 'react';
import { gql, useMutation , useQuery} from '@apollo/client';
import { useFormik  } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const CREATE_SKILL = gql`
mutation creatSkill($skill: String!) {
  creatSkill(skill: $skill) {
    title
    id
    
  }
}
`;
const SKILLS =gql`
query Skills($title: String!, $limit: Int) {
  skills(title: $title, limit: $limit) {
    skills {
      title
      id
      
    }
    message
    status
  }
}
`;

const SelectSkills = () => {
  const [createSkill] = useMutation(CREATE_SKILL);
  const { data,loading, error } = useQuery(SKILLS );
 

  const handleAddSkill = async (newSkill) => {
    try {
      const { data: { createSkill: createSkill } } = await createSkill({
        variables: { skill: newSkill },
      });
      // Handle success
    } catch (err) {
      // Handle error
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const skills = data.skills; 
  return (
    
      <Autocomplete
        multiple
        id="skills-autocomplete"
        options={skills}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => (
          <TextField {...params} label="Skills" variant="outlined" />
        )}
        onChange={(event, value) => {
          // Handle selected skills
          console.log(value);
        }}
        onBlur={(event, value) => {
          // Handle blur, e.g., for typing a new skill
          if (value && value.length > 0) {
            const newSkill = value[value.length - 1];
            handleAddSkill(newSkill);
          }
        }}
      />
    );
  }


export default SelectSkills;
