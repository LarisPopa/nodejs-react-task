import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";

const DropDownComponent = ({
  dropdownDefaulText,
  data,
  onChange,
  label,
  variant,
  defaultValue,
  customClass = "",
  customClassButton = "",
  customClassMenu = "",
}) => {
  const [selectedElementName, setSelectedElementName] = useState(defaultValue);

  const handleChooseOption = (selectedElement) => {
    setSelectedElementName(selectedElement.name);
    onChange(selectedElement.value);
  };

  useEffect(() => {
    setSelectedElementName(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      {label && <h6>{label}</h6>}

      <Dropdown className={customClass}>
        <Dropdown.Toggle
          id="dropdown-basic"
          variant={variant}
          className={
            customClassButton
              ? customClassButton
              : defaultValue || dropdownDefaulText
              ? "dropdown_with_space"
              : "dropdown_default"
          }
        >
          {selectedElementName ? selectedElementName : dropdownDefaulText}
        </Dropdown.Toggle>

        <Dropdown.Menu className={customClassMenu}>
          {data &&
            data.map((dropdownElementData, idx) => {
              return (
                <Dropdown.Item
                  onClick={() => handleChooseOption(dropdownElementData)}
                  key={idx}
                >
                  {dropdownElementData.name}
                </Dropdown.Item>
              );
            })}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDownComponent;
