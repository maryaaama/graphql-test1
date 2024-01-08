import React, {useEffect, useState, useCallback, useMemo } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Autocomplete, Tag, BlockStack,TextField } from '@shopify/polaris';
import { useField, useFormikContext } from "formik";
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


const SelectSkills = ({ label, name }) => {
  const deselectedOptions = useMemo(
    () => [
      {value: 'front-end', label: 'front-end'},
      {value: 'nodejs', label: 'nodejs'},
      {value: 'back-end', label: 'back-end'},
      {value: 'django', label: 'django'},
      {value: 'java', label: 'java'},
    ],
    [],
  );
 
  
  const { setFieldValue ,setFieldError} = useFormikContext({});
  const [field, meta] = useField(name);

  const [selectedOptions, setSelectedOptions] = useState(['front-end']);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(deselectedOptions)
 

  /*const { data } = useQuery(SKILLS_QUERY, {
    variables: {
      title: inputValue,
      limit: 5,
    },
  });*/
const handleBlur = useCallback(() => {
    field.onBlur({ target: { name } });
  }, [field, name]);
  const handleFocus = useCallback(() => {
    setFieldError(name, "");
  }, [name, setFieldError]);

  const error = useMemo(() => {
    if (meta.error && meta.touched) {
      return meta.error;
    }
    return undefined;
  }, [meta.error, meta.touched]);
 

 /* const options = useMemo(() => {
    if (data && data.skills && data.skills.skills) {
      return data.skills.skills.map((option) => ({
        value: option.title,
        label: option.title,
      }));
    }
    return [];
  }, [data]);*/
 

/*when onchange*/
    const updateText = useCallback(
      (value) => {
        setInputValue(value);
        setFieldValue(name, [...selectedOptions,value]);
        if (value === '') {
          setOptions(deselectedOptions);
          return;
        }
  /*set value nd lable*/
        const filterRegex = new RegExp(value, 'i');
        const resultOptions = deselectedOptions.filter((option) =>
          option.label.match(filterRegex),
        );
        setOptions(resultOptions);
      },
      [deselectedOptions],
    );
    /*const updateSelection = useCallback(
      (selected) => {
        if (selectedOptions.includes(selected)) {
          setSelectedOptions(
            selectedOptions.filter((option) => option !== selected),
          );
        } else {
          setSelectedOptions([...selectedOptions, selected]);
          setFieldValue(name, [...selectedOptions, selected]);
        }
  
        updateText("");
      },
      [selectedOptions, updateText],
    );*/
  /*for remove tag*/
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
  
    const textField = (
      <Autocomplete.TextField
        onChange={updateText}
        label={label}
        name={name}
        value={inputValue}
        placeholder="select your skills"
        verticalContent={verticalContentMarkup}
        autoComplete="off"
      />
    );
    useEffect(()=>{
      console.log(selectedOptions)
    },[selectedOptions])
    
    return (
      <div style={{height: '325px'}}>
        <Autocomplete
          allowMultiple
          options={options}
          selected={selectedOptions}
          textField={textField}
          onSelect={setSelectedOptions}
          error={error ? "required !" : false}
          onBlur={handleBlur}
          onFocus={handleFocus}
          listTitle="Suggested Tags"

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

  /*const error = useMemo(() => {
    if (meta.error && meta.touched) {
      return meta.error;
    }
    return undefined;
  }, [meta.error, meta.touched]);

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
    <TextField
      onChange={updateText}
      label="Skills"
      value={inputValue}
      placeholder="Select or add skills"
      verticalContent={verticalContentMarkup}
      autoComplete="off"
    />
  );

  return (
    <div className='autocomp'>
      <Autocomplete
       allowMultiple
        label={label}
        
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={addSkill}
        listTitle="Skills"
      />
    </div>
  );*/
};

export default  SelectSkills;


