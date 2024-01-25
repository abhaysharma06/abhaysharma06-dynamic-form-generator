import React, { useEffect, useState } from "react";
import CreateFormModal from "../../components/Modals/CreateFormModal";

const MainForms = () => {
  const [openForm, setOpenForm] = useState(false);
  const [allFormdata, setAllFormData] = useState([]);
  const [selectedForm, setSelectedForm] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [formCreatedCounter, setFormCreatedCounter] = useState(0);
  const [selectCounter, setSelectCounter] = useState(0);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("form"));
    let savedForms = [...data];
    if (savedForms?.length) {
      setAllFormData([...selectedForm, ...savedForms]);
    }
  }, [formCreatedCounter]);

  useEffect(() => {
    if (selectedId) {
      let tempAllFormData = [...allFormdata];
      let filteredForm = tempAllFormData.filter(
        (data) => data?.formName === selectedId
      )[0];
      if (filteredForm) {
        setSelectedForm(filteredForm);
        setOpenForm(true);
      }
    }
  }, [selectedId, selectCounter]);

  return (
    <div className="forms">
      <div className="forms_heading">
        <h3>Avaliable Generated Forms</h3>
        <div
          className="forms_btnWtrap"
          onClick={(e) => {
            e.stopPropagation();
            if (selectedForm) {
              setOpenForm(true);
              setSelectedForm([]);
            }
          }}
        >
          <button className="btn btn__prmiarybtn">Create Form</button>
        </div>
      </div>
      {allFormdata?.length ? (
        <div className="forms__allform">
          {allFormdata.map((form, index) => {
            return (
              <div
                className="forms__allform--items"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(form?.formName);
                  setSelectCounter((prev) => prev + 1);
                }}
              >
                <h2>{form?.formName}</h2>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>Not form Avaialbe</h2>
      )}

      {openForm ? (
        <div className="forms__formArea">
          <CreateFormModal
            setOpenForm={setOpenForm}
            selectedForm={selectedForm}
            setFormCreatedCounter={setFormCreatedCounter}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MainForms;
