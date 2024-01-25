import React, { useState } from "react";
import { toast } from "react-toastify";

const SelectedElementForm = ({ selectedOption, setFormData }) => {
  const [label, setLabel] = useState(null);
  const [addCheckboxOption, setAddCheckBoxOption] = useState([]);
  const [addRadioOption, setAddRadioOption] = useState([]);
  const [addDropDownOption, setAddDropDownOption] = useState([]);
  const [id, setId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !addDropDownOption?.length ||
      !addCheckboxOption?.length ||
      !addRadioOption?.length
    ) {
      let data = {
        id: id,
        fieldType: selectedOption?.checkboxButton
          ? "checkboxButton"
          : selectedOption?.textInput
          ? "textInput"
          : selectedOption?.textArea
          ? "textArea"
          : selectedOption?.dropdownButton
          ? "dropdownButton"
          : selectedOption?.radioButton
          ? "radioButton"
          : "",
        fieldValue: {
          label: label,
          addCheckboxOption: addCheckboxOption,
          addRadioOption: addRadioOption,
          addDropDownOption: addDropDownOption,
        },
      };
      setFormData((prev) => [...prev, data]);
      setId((prev) => prev + 1);
      setLabel("");
      setAddCheckBoxOption("");
      setAddRadioOption("");
      setAddDropDownOption("");
    } else {
      toast.error("no option added");
    }
  };

  const handleAddCheckboxField = () => {
    setAddCheckBoxOption([...addCheckboxOption, ""]);
  };

  const handleAddRadioField = () => {
    setAddRadioOption([...addRadioOption, ""]);
  };

  const handleAddDropdownField = () => {
    setAddDropDownOption([...addDropDownOption, ""]);
  };

  const handleInputChangeCheckbox = (index, value) => {
    const newInputValues = [...addCheckboxOption];
    newInputValues[index] = value;
    setAddCheckBoxOption(newInputValues);
  };

  const handleInputChangeRadio = (index, value) => {
    const newInputValues = [...addRadioOption];
    newInputValues[index] = value;
    setAddRadioOption(newInputValues);
  };

  const handleInputChangeDropdown = (index, value) => {
    const newInputValues = [...addDropDownOption];
    newInputValues[index] = value;
    setAddDropDownOption(newInputValues);
  };

  console.log("addCheckboxOption", addCheckboxOption.length);
  return (
    <div className="selectedElementForm">
      <h3>Required Details to add the field</h3>
      <form onSubmit={handleSubmit}>
        <div className="group">
          <input
            type="text"
            required
            value={label}
            onChange={(e) => {
              setLabel(e.target.value);
            }}
          />
          <label>Label Text</label>
        </div>

        {selectedOption.radioButton ? (
          <>
            <div className="selectedElementForm__radio">
              <h4>Add radio button</h4>
              <button
                className="btn btn__add"
                onClick={() => handleAddRadioField()}
              >
                Add
              </button>
            </div>
            {addRadioOption?.length
              ? addRadioOption.map((value, ind) => (
                  <div className="group" key={ind}>
                    <input
                      type="text"
                      required
                      value={value}
                      onChange={(e) => {
                        e.preventDefault();
                        handleInputChangeRadio(ind, e.target.value);
                      }}
                    />
                    <label>Options</label>
                  </div>
                ))
              : null}
          </>
        ) : null}

        {selectedOption.checkboxButton ? (
          <>
            <div className="selectedElementForm__radio">
              <h4>Add checkbox button</h4>
              <button
                className="btn btn__add"
                onClick={() => handleAddCheckboxField()}
              >
                Add
              </button>
            </div>
            {addCheckboxOption?.length
              ? addCheckboxOption.map((value, ind) => (
                  <div className="group" key={ind}>
                    <input
                      type="text"
                      required
                      value={value}
                      onChange={(e) => {
                        e.preventDefault();
                        handleInputChangeCheckbox(ind, e.target.value);
                      }}
                    />
                    <label>Options</label>
                  </div>
                ))
              : null}
          </>
        ) : null}

        {selectedOption.dropdownButton ? (
          <>
            <div className="selectedElementForm__radio">
              <h4>Add dropdown button</h4>
              <button
                className="btn btn__add"
                onClick={() => handleAddDropdownField()}
              >
                Add
              </button>
            </div>
            {addDropDownOption?.length
              ? addDropDownOption.map((value, ind) => (
                  <div className="group" key={ind}>
                    <input
                      type="text"
                      required
                      value={value}
                      onChange={(e) => {
                        e.preventDefault();
                        handleInputChangeDropdown(ind, e.target.value);
                      }}
                    />
                    <label>Options</label>
                  </div>
                ))
              : null}
          </>
        ) : null}

        <div className="selectedElementForm__button" onClick={() => {}}>
          <button
            className={
              addDropDownOption.length ||
              addCheckboxOption?.length ||
              addRadioOption?.length ||
              label?.length
                ? "btn btn__prmiarybtn"
                : "btn btn__prmiarybtn btn__disable"
            }
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SelectedElementForm;
