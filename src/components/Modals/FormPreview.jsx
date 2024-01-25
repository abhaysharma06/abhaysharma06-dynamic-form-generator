import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const FormPreview = ({
  formName,
  formData,
  setFormData,
  setOpenForm,
  selectedForm,
  setFormCreatedCounter,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleRemoveField = (id) => {
    let updateFormData = formData.filter((data) => data.id !== id);
    setFormData(updateFormData);
  };

  useEffect(() => {
    if (selectedForm && Object.keys(selectedForm)?.length) {
      setFormData([...selectedForm?.formData]);
    }
  }, []);

  return (
    <div className="formPreview">
      <div className="formPreview__heading">
        <h3>{formName}</h3>
      </div>
      <form>
        {formData.map((field, ind) => {
          return (
            <>
              <div className="group formPreview__field" key={ind}>
                {field.fieldType === "textArea" ? (
                  <>
                    <div className="textArea-main">
                      <div className="textArea-heading">
                        <h3> {field?.fieldValue.label}</h3>
                        <button
                          className="btn btn__secondarybtn btn__remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveField(field?.id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                      <textarea
                        required
                        className="formPreview__textArea"
                        rows="4"
                        cols="36"
                      />
                    </div>
                  </>
                ) : field.fieldType === "textInput" ? (
                  <>
                    <div className="textInputMain">
                      <div className="textInputMain__remove">
                        <button
                          className="btn btn__secondarybtn btn__remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveField(field?.id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                      <div>
                        <input type="text" className="formPreview__input" />
                        <label
                          style={{
                            top: "0",
                          }}
                        >
                          {field?.fieldValue.label}
                        </label>
                      </div>
                    </div>
                  </>
                ) : field.fieldType === "checkboxButton" ? (
                  <>
                    <div className="checkboxWrap">
                      <div className="checkboxWrap__heading">
                        <h3> {field?.fieldValue.label}</h3>
                        <button
                          className="btn btn__secondarybtn btn__remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveField(field?.id);
                          }}
                        >
                          delete
                        </button>
                      </div>

                      <div className="checkboxWrap__checkboxgroup">
                        {field?.fieldValue.addCheckboxOption.map(
                          (option, i) => (
                            <label className="checkboxWrap__checkboxgroup__label">
                              <input
                                type="checkbox"
                                id={`checkbox_${i}`} // Use a unique id for each checkbox
                                name={`checkbox_${i}`} // Use a unique name for each checkbox
                                value={option} // Set the value of the checkbox to the option
                              />
                              <span>{option}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </>
                ) : field.fieldType === "radioButton" ? (
                  <>
                    <div className="radioButton">
                      <div className="radioButton__heading">
                        <h3>{field?.fieldValue.label}</h3>
                        <button
                          className="btn btn__secondarybtn btn__remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveField(field?.id);
                          }}
                        >
                          delete
                        </button>
                      </div>
                      <div className="radioButton__main">
                        {field.fieldValue.addRadioOption.map((options, ind) => {
                          return (
                            <div
                              className="radioButton__main__buttons"
                              key={ind}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelected(options);
                              }}
                            >
                              <div
                                className={
                                  options === selected
                                    ? "button selectedButton"
                                    : "button"
                                }
                              ></div>
                              <div className="value">{options}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : field.fieldType === "dropdownButton" ? (
                  <div class="dropdown">
                    <div className="dropdown__main">
                      <h3>Choose the following</h3>
                      <button
                        className="btn btn__secondarybtn btn__remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveField(field?.id);
                        }}
                      >
                        delete
                      </button>
                    </div>
                    <div
                      className="dropdown__heading"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropDown(!showDropDown);
                      }}
                    >
                      <h4>{field?.fieldValue.label}</h4>
                    </div>
                    {showDropDown
                      ? field?.fieldValue.addDropDownOption.map(
                          (option, index) => {
                            return (
                              <div className="dropdown__list">
                                <p>{option}</p>
                              </div>
                            );
                          }
                        )
                      : null}
                  </div>
                ) : null}
              </div>
            </>
          );
        })}
      </form>
      {formData.length ? (
        <div
          className="formPreview__btn"
          onClick={(e) => {
            e.stopPropagation();
            if (formName?.length) {
              let persitData = JSON.parse(localStorage.getItem(`form`));
              if (persitData.length) {
                let persitDataCopy = [...persitData];
                persitDataCopy.push({
                  formName: formName,
                  formData: formData,
                });
                localStorage.setItem(`form`, JSON.stringify(persitDataCopy));
              } else {
                localStorage.setItem(
                  `form`,
                  JSON.stringify([
                    {
                      formName: formName,
                      formData: formData,
                    },
                  ])
                );
              }
              toast.success("form added sucessfully");
              setOpenForm(false);
              setFormCreatedCounter((prev) => prev + 1);
            } else {
              toast.error("form name missing");
            }
          }}
        >
          <button
            className={
              formName?.length && formData?.length
                ? "btn btn__prmiarybtn "
                : "btn btn__prmiarybtn btn__disable"
            }
          >
            Save form
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FormPreview;
