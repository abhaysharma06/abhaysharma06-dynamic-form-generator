import React, { useState } from "react";
import SelectedElementForm from "./SelectedElementForm";
import FormPreview from "./FormPreview";

const CreateFormModal = ({
  setOpenForm,
  selectedForm,
  setFormCreatedCounter,
}) => {
  const [selectedOption, setSelectedOption] = useState({
    textInput: false,
    textArea: false,
    radioButton: false,
    dropdownButton: false,
    checkboxButton: false,
  });
  const [formName, setFormName] = useState(null);
  const [formData, setFormData] = useState([]);

  return (
    <div
      className="modalMain"
      onClick={(e) => {
        e.stopPropagation();
        setOpenForm(false);
      }}
    >
      <div
        className="modalMain__inner"
        onClick={(e) => {
          e.stopPropagation();
          setOpenForm(true);
        }}
      >
        <div
          className="modalMain__closebtn"
          onClick={(e) => {
            e.stopPropagation();
            setOpenForm(false);
          }}
        >
          <h3>x</h3>
        </div>
        <div className="createFormModal">
          <div className="createFormModal__topheading">
            <h2>Create your Dynamic form</h2>
          </div>
          <div className="createFormModal__formSection">
            <div className="createFormModal__formSection__left">
              <div>
                <form>
                  <div className="group">
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => {
                        e.stopPropagation();
                        setFormName(e.target.value);
                      }}
                    />
                    <label>Form Name</label>
                  </div>
                </form>
              </div>
              <div className="createFormModal__formSection__left--heading">
                <h3>Select your elements</h3>
              </div>

              <div className="createFormModal__formSection__left--btnWrapper">
                <button
                  className={
                    selectedOption?.textInput
                      ? "btn btn__secondarybtn Selectbtn active"
                      : "btn btn__secondarybtn Selectbtn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption({
                      textInput: true,
                      textArea: false,
                      radioButton: false,
                      dropdownButton: false,
                      checkboxButton: false,
                    });
                  }}
                >
                  text input button
                </button>
                <button
                  className={
                    selectedOption?.textArea
                      ? "btn btn__secondarybtn Selectbtn active"
                      : "btn btn__secondarybtn Selectbtn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption({
                      textInput: false,
                      textArea: true,
                      radioButton: false,
                      dropdownButton: false,
                      checkboxButton: false,
                    });
                  }}
                >
                  text area button
                </button>
                <button
                  className={
                    selectedOption?.radioButton
                      ? "btn btn__secondarybtn Selectbtn active"
                      : "btn btn__secondarybtn Selectbtn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption({
                      textInput: false,
                      textArea: false,
                      radioButton: true,
                      dropdownButton: false,
                      checkboxButton: false,
                    });
                  }}
                >
                  radio button
                </button>
                <button
                  className={
                    selectedOption?.checkboxButton
                      ? "btn btn__secondarybtn Selectbtn active"
                      : "btn btn__secondarybtn Selectbtn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption({
                      textInput: false,
                      textArea: false,
                      radioButton: false,
                      dropdownButton: false,
                      checkboxButton: true,
                    });
                  }}
                >
                  checkbox button
                </button>
                <button
                  className={
                    selectedOption?.dropdownButton
                      ? "btn btn__secondarybtn Selectbtn active"
                      : "btn btn__secondarybtn Selectbtn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption({
                      textInput: false,
                      textArea: false,
                      radioButton: false,
                      dropdownButton: true,
                      checkboxButton: false,
                    });
                  }}
                >
                  dropdown button
                </button>
              </div>
              {selectedOption.textInput ||
              selectedOption.textArea ||
              selectedOption.checkboxButton ||
              selectedOption.radioButton ||
              selectedOption.dropdownButton ? (
                <SelectedElementForm
                  selectedOption={selectedOption}
                  setFormData={setFormData}
                  setSelectedOption={setSelectedOption}
                />
              ) : null}
            </div>
            <div className="createFormModal__formSection__right">
              <FormPreview
                formName={formName}
                formData={formData}
                setFormData={setFormData}
                setOpenForm={setOpenForm}
                selectedForm={selectedForm}
                setFormCreatedCounter={setFormCreatedCounter}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFormModal;
