import { useState } from "react";
import Select from "react-select"; // belongs to autocomplete component
import makeAnimated from "react-select/animated"; // belongs to autocomplete component

const animatedComponents = makeAnimated(); // belongs to autocomplete componen

export default function AutoCompleteComponent() {
  const [skills, setSkills] = useState({});

  const options = [
    { value: "Javascrip", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
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
}
