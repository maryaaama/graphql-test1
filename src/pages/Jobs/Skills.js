import {useFormikContext, useField } from 'formik';
import React, {useEffect, useState, useCallback, useMemo } from 'react';
import { Tag,Listbox,EmptySearchResult,Combobox,Text,AutoSelection,BlockStack} from '@shopify/polaris';

const Skills = ({ label, ...props }) => {

    const { setFieldValue , setFieldError } = useFormikContext();
    const [field, meta] = useField(props);

    const [selectedTags, setSelectedTags] = useState(['FrontEnd']);
    const [value, setValue] = useState('');
    const [suggestion, setSuggestion] = useState('');
   
    const handleActiveOptionChange = useCallback(
      (activeOption) => {
        const activeOptionIsAction = activeOption === value;
  
        if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
          setSuggestion(activeOption);
        } else {
          setSuggestion('');
        }
      },
      [value, selectedTags],
    );

    const handleSelectChange = useCallback(
      (value) => {
        setFieldValue(props.name, value);
      },
      [props.name, setFieldValue]
    );

    const updateSelection = useCallback(
      (selected) => {
        const nextSelectedTags = new Set([...selectedTags]);
    
        if (nextSelectedTags.has(selected)) {
          nextSelectedTags.delete(selected);
        } else {
          nextSelectedTags.add(selected);
        }
        setSelectedTags([...nextSelectedTags]);
    
        setValue('');
        setSuggestion('');
    
        // Call handleSelectChange to update formik field value
        handleSelectChange([...nextSelectedTags]);
      },
      [selectedTags, setValue, setSuggestion, handleSelectChange],
    );
    
    const removeTag = useCallback(
      (tag) => () => {
        updateSelection(tag);
      },
      [updateSelection],
    );
    const getAllTags = useCallback(() => {
      const savedTags = ['BackEnd', 'FrontEnd', 'React', 'JavaScript', 'Pyton'];
      return [...new Set([...savedTags, ...selectedTags].sort())];
    }, [selectedTags]);
  
    const formatOptionText = useCallback(
      (option) => {
        const trimValue = value.trim().toLocaleLowerCase();
        const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);
  
        if (!value || matchIndex === -1) return option;
  
        const start = option.slice(0, matchIndex);
        const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
        const end = option.slice(matchIndex + trimValue.length, option.length);
  
        return (
          <p>
            {start}
            <Text fontWeight="bold" as="span">
              {highlight}
            </Text>
            {end}
          </p>
        );
      },
      [value],
    );
    const options = useMemo(() => {
      let list;
      const allTags = getAllTags();
      const filterRegex = new RegExp(value, 'i');
  
      if (value) {
        list = allTags.filter((tag) => tag.match(filterRegex));
      } else {
        list = allTags;
      }
  
      return [...list];
    }, [value, getAllTags]);

    const verticalContentMarkup =
    selectedTags.length > 0 ? (
      <BlockStack spacing="extraTight" alignment="center">
        {selectedTags.map((tag) => (
          <Tag key={`option-${tag}`} onRemove={removeTag(tag)}>
            {tag}
          </Tag>
        ))}
      </BlockStack>
    ) : null;
    const optionMarkup =
    options.length > 0
      ? options.map((option) => {
          return (
            <Listbox.Option
              key={option}
              value={option}
              selected={selectedTags.includes(option)}
              accessibilityLabel={option}
            >
              <Listbox.TextOption selected={selectedTags.includes(option)}>
                {formatOptionText(option)}
              </Listbox.TextOption>
            </Listbox.Option>
          );
        })
      : null;
      const noResults = value && !getAllTags().includes(value);

  const actionMarkup = noResults ? (
    <Listbox.Action value={value}>{`Add "${value}"`}</Listbox.Action>
  ) : null;

  const emptyStateMarkup = optionMarkup ? null : (
    <EmptySearchResult
      title=""
      description={`No tags found matching "${value}"`}
    />
  );
  const listboxMarkup =
  optionMarkup || actionMarkup || emptyStateMarkup ? (
    <Listbox
      autoSelection={AutoSelection.None}
      onSelect={updateSelection}
      onActiveOptionChange={handleActiveOptionChange}
    >
      {actionMarkup}
      {optionMarkup}
    </Listbox>
  ) : null;


  
  
    useEffect(() => {
      console.log('field in skill input', field);
    }, [field]);
  
   
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Combobox
        allowMultiple
        name={props.name}
        label={label}
        activator={
          <Combobox.TextField
            autoComplete="off"
            label={label}
            labelHidden
            value={value}
            suggestion={suggestion}
            placeholder="Search tags"
            verticalContent={verticalContentMarkup}
            onChange={setValue}
          />
        }
      >
        {listboxMarkup}
      </Combobox>

      </div>
    );
  };
  
  export default Skills;
  