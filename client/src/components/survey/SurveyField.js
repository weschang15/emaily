import React from "react";

const SurveyField = ({ input, label, meta: { error, touched } }) => {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>
        {label}
        <input {...input} style={{ marginBottom: "5px" }} />
      </label>
      <p className="red-text" style={{ margin: 0 }}>
        {touched && error}
      </p>
    </div>
  );
};

export default SurveyField;
