import { useCallback, useState } from "react";
import { useQuery,gql } from "@apollo/client";
import { BlockStack, Combobox, Listbox, Tag } from "@shopify/polaris";
import { useFormikContext } from "formik";

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
const titleCase = (string) => {
    return string
      .toLowerCase()
      .split(" ")
      .map((word) => word.replace(word[0], word[0].toUpperCase()))
      .join("");
  };
 const TextFieldSkills = (props) => {
  const { values: { skills },setFieldValue } = useFormikContext();
  const { name } = props;
  const [inputValue, setInputValue] = useState("");
  const { data } = useQuery(SKILLS_QUERY, {
    variables: {
      title: inputValue,
      limit: 3,
    },
  });

  const updateTextSkill = useCallback(
    (value) => setInputValue(value),
    [setInputValue]
  );

  const updateSelection = useCallback(
    (selected) => {
      if (skills.includes(selected)) {
        setInputValue("");
        return;
      }

      setInputValue("");
      setFieldValue(name, [...skills, selected]);
    },
    [setFieldValue, setInputValue, name, skills]
  );

  const removeTag = useCallback(
    (tag) => () => {
      const result = skills.filter((skill) => skill !== tag);
      setFieldValue(name, result);
    },
    [setFieldValue, skills, name]
  );

  const tagsMarkup = skills.map((skill) => {
    let tagSkill = "";
    tagSkill = skill.replace("_", " ");
    tagSkill = titleCase(tagSkill);
    return (
      <Tag key={skill} onRemove={removeTag(skill)}>
        {tagSkill}
      </Tag>
    );
  });

  const optionsMarkup = data
    ? data.skills.skills.map((skill) => {
        const { title, id } = skill;

        let value = "";
        value = title.replace("_", " ");
      value =titleCase(value);

        return (
          <Listbox.Option
            key={`${id}`}
            value={value}
            selected={skills.includes(value)}
            accessibilityLabel={value}
          >
            {value}
          </Listbox.Option>
        );
      })
    : null;

  return (
    <>
      <Combobox
        activator={
          <Combobox.TextField
            onChange={updateTextSkill}
            label="Skills"
            value={inputValue}
          />
        }
      >
        <Listbox onSelect={updateSelection}>
          {inputValue !== "" ? (
            <Listbox.Action value={inputValue}>{inputValue}</Listbox.Action>
          ) : null}
          {optionsMarkup}
        </Listbox>
      </Combobox>
      <br />
     
        <BlockStack>{tagsMarkup}</BlockStack>
    
      <br />
    </>
  );
};
export default TextFieldSkills;