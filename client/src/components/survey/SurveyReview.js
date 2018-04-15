import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fields } from "../../helpers/fields";
import * as actions from "../../actions";

/**
 * @param {func} onCancel     - function passed down as a prop to cancel the survey creation
 * @param {obj}  formValues   - list of form values submitted via SurveyForm component
 * @param {func} submitSurvey - redux action to fire off a request to our api and return to us our
 * updated user
 * @param {obj}  history      - React Router's history object will allow us to redirect to another component
 * within the submitSurvey action once the survey has been sent
 */
const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  /**
   * Map over our field configuration and render out our fields with the user submitted values
   *
   * * This will allow us to keep the same order of the fields as displayed on the SurveyForm component
   * * This will also allow us to easily match the field labels with the field values easily
   *
   * @return array
   */
  const renderFields = fields.map(({ label, type, name }, key) => {
    return (
      <label key={key}>
        <strong>{label}</strong>
        <input type={type} value={formValues[name]} disabled />
      </label>
    );
  });

  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      {renderFields}
      <div className="right" style={{ marginTop: "25px" }}>
        <button
          className="waves-effect grey lighten-2 btn-flat"
          onClick={onCancel}
          style={{ marginRight: "10px" }}
        >
          Back
        </button>
        <button
          className="btn waves-effect waves-teal"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send
          <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.surveyForm.values };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyReview));
