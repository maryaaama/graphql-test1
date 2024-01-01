import React, { useState, useCallback, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Autocomplete, Tag, BlockStack } from '@shopify/polaris';
import { useFormikContext } from 'formik';

const SKILLS_QUERY = gql`
  query Skills($title: String!, $limit: Int) {
    skills(title: $title, limit: $limit) {
      skills {
        title
        id
      }
    }
  }
`;

const MultiAutocompleteExample = ({ label, name }) => {
  const { setFieldValue } = useFormikContext();

  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const { data } = useQuery(SKILLS_QUERY, {
    variables: {
      title: inputValue,
      limit: 5,
    },
  });

  const options = useMemo(() => {
    if (data && data.skills && data.skills.skills) {
      return data.skills.skills.map((option) => ({
        value: option.title,
        label: option.title,
      }));
    }
    return [];
  }, [data]);

  const updateText = useCallback((value) => {
    setInputValue(value);
  }, []);

  const addSkill = useCallback(
    (selected) => {
      setSelectedOptions(selected);
      setFieldValue(name, selected);
    },
    [setFieldValue, name]
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <BlockStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => (
          <Tag key={option} onRemove={() => addSkill([])}>
            {option}
          </Tag>
        ))}
      </BlockStack>
    ) : null;

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Skills"
      value={inputValue}
      placeholder="Select or add skills"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div style={{ height: '325px' }}>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={addSkill}
        listTitle="Skills"
      />
    </div>
  );
};

export default MultiAutocompleteExample;


/*import React from 'react';
import {useState, useCallback, useMemo} from 'react';
import { gql, useQuery} from '@apollo/client';
import { useFormik  } from 'formik';
import * as yup from 'yup';
import {BlockStack, Tag,Listbox, Autocomplete} from '@shopify/polaris';
import { useField, useFormikContext } from "formik";

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




export default function MultiAutocompleteExample({ label, name }) {
 
  const deselectedOptions = useMemo(
    () => [
      {value: 'front-end', label: 'front-end'},
      {value: 'python', label: 'python'},
      {value: 'c++', label: 'c++'},
      {value: 'Nodejs', label: 'Nodejs'},
      {value: 'back-end', label: 'back-end'},
    ],


    [],
  );
  const [field, meta] = useField(name);
  const [selectedOptions, setSelectedOptions] = useState(Array.isArray(field.value) ? field.value : []);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions);

  const { data } = useQuery(SKILLS, {
    variables: {
      title: inputValue,
      limit: 5,
    },
  });
  const error = useMemo(() => {
    if (meta.error && meta.touched) {
      return meta.error;
    }
    return undefined;
  }, [meta.error, meta.touched]);
 

  const updateText = useCallback(
    (value) => {
      setInputValue(value);

      if (value === '') {
        setOptions(deselectedOptions);
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex),
      );

      setOptions(resultOptions);
    },
    [deselectedOptions],
  );

  const removeTag = useCallback(
    (tag) => () => {
      const options = [...selectedOptions];
      options.splice(options.indexOf(tag), 1);
      setSelectedOptions(options);
    },
    [selectedOptions],
  );

  const verticalContentMarkup =
    selectedOptions.length > 0 ? (
      <BlockStack spacing="extraTight" alignment="center">
        {selectedOptions.map((option) => {
          let tagLabel = '';
          tagLabel = option.replace('_', ' ');
          tagLabel = titleCase(tagLabel);
          return (
            <Tag key={`option${option}`} onRemove={removeTag(option)}>
              {tagLabel}
            </Tag>
          );
        })}
      </BlockStack>
    ) : null;

    const optionsMarkUp = data && data.skills && data.skills.skills
  ? data.skills.skills.map((option) => {
      const { title, id } = option;
      return (
        <Listbox.Option
          key={`${title + id}`}
          value={title}
          selected={selectedOptions.includes(title)}
          accessibilityLabel={label}
        >
          {title}
        </Listbox.Option>
      );
    })
  : null;
  const textField = (
    
    <Autocomplete.TextField
      onChange={updateText}
      label="Tags"
      value={inputValue}
      placeholder="select job skills"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div style={{height: '325px'}}>
      <Autocomplete
        allowMultiple
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="skills"
      />
    </div>
  );

  function titleCase(string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join('');
  }
}*/