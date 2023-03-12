import { useState } from "react";
import Select from "react-select"; // belongs to autocomplete component
import makeAnimated from "react-select/animated"; // belongs to autocomplete component

const animatedComponents = makeAnimated(); // belongs to autocomplete componen

export default function AutoCompleteComponent() {
  const [skills, setSkills] = useState({});

  const options = [
    { value: "JavaScript", label: "Javascript" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "ReactJS", label: "ReactJS" },
    { value: "NextJS", label: "NextJS" },
    { value: "MySQL", label: "MySQL" },
  ];

  const handleChange = (e) => {
    setSkills(e.target.value);
  };

  return (
    <Select
      onChange={handleChange}
      closeMenuOnSelect={false}
      components={animatedComponents}
      defaultValue={options[0]}
      isMulti
      options={options}
    />
  );
}``
